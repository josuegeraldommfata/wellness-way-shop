import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/mockData";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { totalItems, subtotal } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/loja?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      {/* Top bar */}
      <div className="bg-foreground text-background">
        <div className="container-custom flex h-8 items-center justify-between text-xs">
          <span className="hidden sm:inline opacity-80">{settings.topBarText}</span>
          <div className="flex items-center gap-3 ml-auto">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                    Painel Admin
                  </Link>
                )}
                <Link to="/conta" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                  Olá, {user?.name.split(" ")[0]}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                  Entrar
                </Link>
                <span className="opacity-40">|</span>
                <Link to="/cadastro" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="container-custom flex h-16 items-center gap-4">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-10 max-w-[160px] object-contain" />
            ) : (
              <span className="text-xl font-bold text-primary">{settings.siteName}</span>
            )}
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-10 rounded-full border-border bg-muted/50 focus:bg-background"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto shrink-0">
            {/* Search toggle mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
              <Link to={isAuthenticated ? "/conta" : "/login"}>
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Link to="/carrinho" className="relative flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium">{formatPrice(subtotal)}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category navigation - desktop */}
      <nav className="hidden md:block border-b border-border bg-background">
        <div className="container-custom">
          <ul className="flex items-center gap-0 overflow-x-auto">
            {settings.navbarLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-all whitespace-nowrap",
                    location.pathname + location.search === item.href && "text-primary border-primary"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden border-b border-border p-3 bg-background animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 rounded-full"
              autoFocus
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container-custom py-3">
            <ul className="space-y-0.5">
              {settings.navbarLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors",
                      location.pathname + location.search === item.href && "text-primary bg-primary/5"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {!isAuthenticated && (
                <li className="pt-3 border-t border-border mt-3">
                  <Link
                    to="/login"
                    className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar / Criar conta
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
