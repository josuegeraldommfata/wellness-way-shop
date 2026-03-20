import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface SiteSettings {
  // Branding
  logoUrl: string;
  faviconUrl: string;
  siteName: string;

  // Colors (HSL values without hsl())
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  // Navbar
  navbarBgColor: string;
  navbarTextColor: string;
  navbarLinks: { name: string; href: string }[];

  // Footer
  footerBgColor: string;
  footerTextColor: string;
  footerAboutText: string;
  footerPhone: string;
  footerEmail: string;
  footerInstagram: string;
  footerFacebook: string;
  footerYoutube: string;

  // Top bar
  topBarText: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  saveSettingsToAPI: () => Promise<void>;
  resetSettings: () => void;
  loading: boolean;
}

const defaultSettings: SiteSettings = {
  // Branding
  logoUrl: "",
  faviconUrl: "",
  siteName: "LipoImports",

  // Colors
  primaryColor: "217 91% 55%",
  secondaryColor: "203 67% 94%",
  accentColor: "145 63% 42%",

  // Navbar
  navbarBgColor: "217 91% 55%",
  navbarTextColor: "0 0% 100%",
  navbarLinks: [
    { name: "Canetas Emagrecedoras", href: "/loja?categoria=canetas-emagrecedoras" },
    { name: "Vitaminas", href: "/loja?categoria=vitaminas" },
    { name: "Suplementos", href: "/loja?categoria=suplementos" },
    { name: "Promocoes", href: "/loja?promocoes=true" },
  ],

  // Footer
  footerBgColor: "217 91% 55%",
  footerTextColor: "0 0% 100%",
  footerAboutText: "A LipoImports oferece produtos importados de qualidade para auxiliar no emagrecimento, com preco justo e entrega rapida em todo o Brasil.",
  footerPhone: "(83) 99339-6445",
  footerEmail: "contato@lipoimports.com.br",
  footerInstagram: "",
  footerFacebook: "",
  footerYoutube: "",

  // Top bar
  topBarText: "Importados para seu bem-estar!",
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from API on mount
  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/settings`);
      if (response.ok) {
        const data = await response.json();
        // The API returns key-value pairs - merge with defaults
        const merged: SiteSettings = { ...defaultSettings };
        for (const [key, value] of Object.entries(data)) {
          if (key === "navbarLinks") {
            try {
              (merged as unknown as Record<string, unknown>)[key] = typeof value === "string" ? JSON.parse(value as string) : value;
            } catch {
              // Keep default
            }
          } else if (key in merged) {
            (merged as unknown as Record<string, unknown>)[key] = value;
          }
        }
        setSettings(merged);
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem("lipoimports_settings");
        if (stored) {
          setSettings({ ...defaultSettings, ...JSON.parse(stored) });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configuracoes da API:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem("lipoimports_settings");
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", settings.primaryColor);
    root.style.setProperty("--secondary", settings.secondaryColor);
    root.style.setProperty("--accent", settings.accentColor);
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Save to API and localStorage
  const saveSettingsToAPI = async () => {
    try {
      // Save to localStorage as backup
      localStorage.setItem("lipoimports_settings", JSON.stringify(settings));

      // Prepare data for API (flatten navbarLinks to string)
      const apiData: Record<string, string> = {};
      for (const [key, value] of Object.entries(settings)) {
        if (key === "navbarLinks") {
          apiData[key] = JSON.stringify(value);
        } else {
          apiData[key] = String(value);
        }
      }

      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        console.error('Erro ao salvar configuracoes na API');
      }
    } catch (error) {
      console.error('Erro ao salvar configuracoes:', error);
      // At least localStorage was saved
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("lipoimports_settings");
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, saveSettingsToAPI, resetSettings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
}
