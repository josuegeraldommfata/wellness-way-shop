import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { StoreDataProvider } from "@/contexts/StoreDataContext";

// Pages
import Index from "./pages/Index";
import Loja from "./pages/Loja";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Conta from "./pages/Conta";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Politicas from "./pages/Politicas";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAparencia from "./pages/admin/Aparencia";
import AdminCategorias from "./pages/admin/Categorias";
import AdminProdutos from "./pages/admin/Produtos";
import AdminPedidos from "./pages/admin/Pedidos";
import AdminVideos from "./pages/admin/Videos";
import AdminPagamentos from "./pages/admin/Pagamentos";
import AdminEnvio from "./pages/admin/Envio";
import AdminConfiguracoes from "./pages/admin/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SiteSettingsProvider>
          <StoreDataProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/produto/:slug" element={<Produto />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/conta" element={<Conta />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/politicas" element={<Politicas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/aparencia" element={<AdminAparencia />} />
                <Route path="/admin/categorias" element={<AdminCategorias />} />
                <Route path="/admin/produtos" element={<AdminProdutos />} />
                <Route path="/admin/pedidos" element={<AdminPedidos />} />
                <Route path="/admin/videos" element={<AdminVideos />} />
                <Route path="/admin/pagamentos" element={<AdminPagamentos />} />
                <Route path="/admin/envio" element={<AdminEnvio />} />
                <Route path="/admin/configuracoes" element={<AdminConfiguracoes />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </StoreDataProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
