import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Database, RefreshCw, Info } from "lucide-react";
import { toast } from "sonner";

export default function AdminConfiguracoes() {
  const { resetSettings } = useSiteSettings();

  const handleResetSettings = () => {
    if (confirm("Tem certeza que deseja restaurar todas as configurações para o padrão?")) {
      resetSettings();
      toast.success("Configurações restauradas!");
    }
  };

  const handleClearData = () => {
    if (
      confirm(
        "ATENÇÃO: Isso irá apagar todos os dados mockados (produtos, pedidos, vídeos). Deseja continuar?"
      )
    ) {
      localStorage.removeItem("lipoimports_products");
      localStorage.removeItem("lipoimports_categories");
      localStorage.removeItem("lipoimports_subcategories");
      localStorage.removeItem("lipoimports_orders");
      localStorage.removeItem("lipoimports_videos");
      localStorage.removeItem("lipoimports_payments");
      localStorage.removeItem("lipoimports_shipping");
      toast.success("Dados limpos! Recarregue a página.");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Configurações gerais do sistema</p>
        </div>

        <div className="grid gap-6">
          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Sobre este Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Este é um sistema de e-commerce <strong>front-end mockado</strong> para
                demonstração. Todos os dados são armazenados localmente no navegador
                (localStorage).
              </p>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">Front-end Only</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Armazenamento</span>
                  <span className="font-medium">localStorage</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Pagamentos</span>
                  <span className="font-medium">Estrutura preparada (Mercado Pago)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Envio</span>
                  <span className="font-medium">Estrutura preparada (Melhor Envio)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Restaurar Aparência
              </CardTitle>
              <CardDescription>
                Restaura cores, textos e configurações visuais para o padrão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Restaurar Configurações Visuais
              </Button>
            </CardContent>
          </Card>

          {/* Clear Data */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Database className="h-5 w-5" />
                Limpar Dados
              </CardTitle>
              <CardDescription>
                Remove todos os dados mockados e restaura para o estado inicial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleClearData}>
                <Database className="h-4 w-4 mr-2" />
                Limpar Todos os Dados
              </Button>
            </CardContent>
          </Card>

          {/* Future Integration Info */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preparado para Backend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Este sistema foi desenvolvido com estrutura preparada para integração futura
                com APIs. Ao adicionar um backend real:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-2">
                <li>Os contextos podem ser facilmente adaptados para usar APIs REST</li>
                <li>As configurações do Mercado Pago serão usadas para pagamentos reais</li>
                <li>O Melhor Envio fornecerá cotação de frete automática</li>
                <li>Os pedidos serão salvos em um banco de dados real</li>
                <li>A autenticação passará a usar tokens JWT seguros</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
