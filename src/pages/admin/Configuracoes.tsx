import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Database, RefreshCw, Info, CheckCircle2, Server } from "lucide-react";
import { toast } from "sonner";

export default function AdminConfiguracoes() {
  const { resetSettings } = useSiteSettings();

  const handleResetSettings = () => {
    if (confirm("Tem certeza que deseja restaurar todas as configuracoes para o padrao?")) {
      resetSettings();
      toast.success("Configuracoes restauradas!");
    }
  };

  const handleClearLocalData = () => {
    if (
      confirm(
        "ATENCAO: Isso ira apagar dados locais (cache). Os dados do banco permanecem. Deseja continuar?"
      )
    ) {
      localStorage.removeItem("lipoimports_subcategories");
      localStorage.removeItem("lipoimports_payments");
      localStorage.removeItem("lipoimports_shipping");
      localStorage.removeItem("lipoimports_settings");
      toast.success("Cache local limpo! Recarregando...");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuracoes</h1>
          <p className="text-muted-foreground">Configuracoes gerais do sistema</p>
        </div>

        <div className="grid gap-6">
          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sistema de e-commerce conectado ao backend com banco de dados PostgreSQL.
                Todas as alteracoes feitas no painel admin sao salvas no banco e refletidas
                automaticamente no frontend da loja.
              </p>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Full-Stack (API + Banco de Dados)
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Produtos</span>
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Sincronizado via API
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Banners</span>
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Sincronizado via API
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Videos</span>
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Sincronizado via API
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Categorias</span>
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Sincronizado via API
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Configuracoes/Aparencia</span>
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Sincronizado via API
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Pagamentos</span>
                  <span className="font-medium">Estrutura preparada (Mercado Pago, PIX, Stripe)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Envio</span>
                  <span className="font-medium">Estrutura preparada (Melhor Envio, Correios)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Restaurar Aparencia
              </CardTitle>
              <CardDescription>
                Restaura cores, textos e configuracoes visuais para o padrao
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Restaurar Configuracoes Visuais
              </Button>
            </CardContent>
          </Card>

          {/* Clear Cache */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Database className="h-5 w-5" />
                Limpar Cache Local
              </CardTitle>
              <CardDescription>
                Remove dados em cache no navegador. Os dados do banco de dados nao serao afetados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleClearLocalData}>
                <Database className="h-4 w-4 mr-2" />
                Limpar Cache do Navegador
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
