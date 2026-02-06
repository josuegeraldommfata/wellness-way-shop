import { ReactNode, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Palette,
  Package,
  FolderTree,
  ShoppingCart,
  Video,
  CreditCard,
  Truck,
  LogOut,
  Menu,
  X,
  Settings,
  Home,
  Image as ImageIcon,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Aparência", href: "/admin/aparencia", icon: Palette },
  { name: "Banners", href: "/admin/banners", icon: ImageIcon },
  { name: "Categorias", href: "/admin/categorias", icon: FolderTree },
  { name: "Produtos", href: "/admin/produtos", icon: Package },
  { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { name: "Cupons", href: "/admin/cupons", icon: Tag },
  { name: "Vídeos", href: "/admin/videos", icon: Video },
  { name: "Pagamentos", href: "/admin/pagamentos", icon: CreditCard },
  { name: "Envio", href: "/admin/envio", icon: Truck },
  { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile header */}
      <div className="lg:hidden bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary-foreground hover:bg-white/10"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="font-bold">Admin LipoImports</span>
        </div>
        <Link to="/" className="text-sm hover:underline">
          Ver loja
        </Link>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-200 ease-in-out lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <h1 className="text-xl font-bold">Admin</h1>
              <p className="text-sm opacity-80">LipoImports</p>
            </div>

            {/* User info */}
            <div className="p-4 border-b border-white/10">
              <p className="text-sm opacity-80">Logado como:</p>
              <p className="font-medium truncate">{user?.name}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                      isActive
                        ? "bg-white/20 font-medium"
                        : "hover:bg-white/10"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Ver loja</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
