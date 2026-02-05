import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const cartItemCount = 0;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container-custom flex h-10 items-center justify-between text-sm text-primary-foreground">
          <span className="hidden sm:inline">{settings.topBarText}</span>
          <div className="flex items-center gap-4 ml-auto">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="hover:underline transition-colors">
                    Admin
                  </Link>
                )}
                <span className="hidden sm:inline">|</span>
                <Link to="/conta" className="hover:underline transition-colors">
                  Olá, {user?.name.split(" ")[0]}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline transition-colors">
                  Entrar
                </Link>
                <span className="hidden sm:inline">|</span>
                <Link to="/cadastro" className="hover:underline transition-colors">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background border-b border-border shadow-sm">
        <div className="container-custom flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-12" />
            ) : (
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">
                  {settings.siteName.split("Imports")[0] || "Lipo"}
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Imports</span>
              </div>
            )}
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 rounded-full border-2 border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart */}
            <Link to="/carrinho" className="relative flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <span className="hidden sm:block text-sm font-medium">R$0,00</span>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:block bg-primary">
          <div className="container-custom">
            <ul className="flex items-center justify-center gap-1">
              {settings.navbarLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-white/10 transition-colors",
                      location.pathname + location.search === item.href && "bg-white/20"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="ml-auto flex items-center gap-2 text-primary-foreground text-sm">
                <Phone className="h-4 w-4" />
                <span>Compre pelo WhatsApp: {settings.footerPhone}</span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-up">
          {/* Mobile search */}
          <div className="p-4 border-b border-border">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 rounded-full"
              />
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="p-4">
            <ul className="space-y-1">
              {settings.navbarLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Painel Admin
                  </Link>
                </li>
              )}
              <li className="pt-4 border-t border-border mt-4">
                <a
                  href={`https://wa.me/55${settings.footerPhone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-accent rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>WhatsApp: {settings.footerPhone}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
