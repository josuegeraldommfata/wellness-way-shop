import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface SiteSettings {
  // Branding
  logoUrl: string;
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
  
  // Top bar
  topBarText: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: SiteSettings = {
  // Branding
  logoUrl: "",
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
    { name: "Promoções", href: "/loja?promocoes=true" },
  ],
  
  // Footer
  footerBgColor: "217 91% 55%",
  footerTextColor: "0 0% 100%",
  footerAboutText: "A LipoImports oferece produtos importados de qualidade para auxiliar no emagrecimento, com preço justo e entrega rápida em todo o Brasil.",
  footerPhone: "(83) 99339-6445",
  footerEmail: "contato@lipoimports.com.br",
  footerInstagram: "https://instagram.com/lipoimports",
  
  // Top bar
  topBarText: "Importados para seu bem-estar!",
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const stored = localStorage.getItem("lipoimports_settings");
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("lipoimports_settings", JSON.stringify(settings));
    
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", settings.primaryColor);
    root.style.setProperty("--secondary", settings.secondaryColor);
    root.style.setProperty("--accent", settings.accentColor);
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("lipoimports_settings");
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
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
