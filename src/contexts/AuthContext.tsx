import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: { email: string; password: string; user: User }[] = [
  {
    email: "admin@lipoimports.com",
    password: "admin123",
    user: {
      id: "admin-1",
      email: "admin@lipoimports.com",
      name: "Administrador",
      role: "admin",
    },
  },
  {
    email: "cliente@email.com",
    password: "cliente123",
    user: {
      id: "customer-1",
      email: "cliente@email.com",
      name: "Cliente Teste",
      role: "customer",
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("lipoimports_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser(foundUser.user);
      localStorage.setItem("lipoimports_user", JSON.stringify(foundUser.user));
      return { success: true };
    }

    return { success: false, error: "Email ou senha inválidos" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lipoimports_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
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
