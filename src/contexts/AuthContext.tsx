import React, { createContext, useContext, useState, ReactNode } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("lipoimports_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("lipoimports_token");
  });

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData: User = {
          id: String(data.user?.id || data.id),
          email: data.user?.email || data.email || email,
          name: data.user?.name || data.name || 'Usuario',
          role: data.user?.role || data.role || 'customer',
        };
        const authToken = data.token;

        setUser(userData);
        setToken(authToken);
        localStorage.setItem("lipoimports_user", JSON.stringify(userData));
        if (authToken) {
          localStorage.setItem("lipoimports_token", authToken);
        }
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.message || "Email ou senha invalidos" };
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Fallback: try mock login for development
      if (email === "admin@lipoimports.com" && password === "admin123") {
        const mockUser: User = { id: "admin-1", email, name: "Administrador", role: "admin" };
        setUser(mockUser);
        localStorage.setItem("lipoimports_user", JSON.stringify(mockUser));
        return { success: true };
      }
      if (email === "cliente@email.com" && password === "cliente123") {
        const mockUser: User = { id: "customer-1", email, name: "Cliente Teste", role: "customer" };
        setUser(mockUser);
        localStorage.setItem("lipoimports_user", JSON.stringify(mockUser));
        return { success: true };
      }
      return { success: false, error: "Erro ao conectar com o servidor" };
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      if (response.ok) {
        const data = await response.json();
        const userData: User = {
          id: String(data.user?.id || data.id),
          email: data.user?.email || email,
          name: data.user?.name || name,
          role: 'customer',
        };
        const authToken = data.token;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("lipoimports_user", JSON.stringify(userData));
        if (authToken) localStorage.setItem("lipoimports_token", authToken);
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.message || "Erro ao criar conta" };
      }
    } catch {
      return { success: false, error: "Erro ao conectar com o servidor" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lipoimports_user");
    localStorage.removeItem("lipoimports_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper function to get auth headers
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("lipoimports_token");
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}
