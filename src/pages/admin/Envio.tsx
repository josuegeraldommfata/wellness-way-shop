import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData, ShippingIntegration } from "@/contexts/StoreDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Truck, Package, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function AdminEnvio() {
  const { shippingIntegrations, updateShippingIntegration } = useStoreData();

  const [configs, setConfigs] = useState<Record<string, ShippingIntegration["config"]>>(
    shippingIntegrations.reduce((acc, si) => ({ ...acc, [si.id]: si.config }), {})
  );

  const handleToggle = (id: string, enabled: boolean) => {
    updateShippingIntegration(id, { enabled });
    toast.success(enabled ? "Integração ativada" : "Integração desativada");
  };

  const handleConfigChange = (id: string, key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const handleSaveConfig = (id: string) => {
    updateShippingIntegration(id, { config: configs[id] });
    toast.success("Configurações salvas!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Envio</h1>
          <p className="text-muted-foreground">
            Configure as integrações de envio e frete
          </p>
        </div>

        <div className="grid gap-6">
          {shippingIntegrations.map((si) => (
            <Card key={si.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{si.name}</CardTitle>
                      <CardDescription>
                        {si.type === "melhor_envio" &&
                          "Cotação automática de frete com múltiplas transportadoras"}
                        {si.type === "correios" && "Envio via Correios (PAC, SEDEX)"}
                        {si.type === "jadlog" && "Transportadora JadLog"}
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={si.enabled}
                    onCheckedChange={(v) => handleToggle(si.id, v)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {si.type === "melhor_envio" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        O Melhor Envio permite cotação automática de frete com várias
                        transportadoras (Correios, JadLog, Azul Cargo, etc).
                      </p>
                      <a
                        href="https://melhorenvio.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Criar conta no Melhor Envio
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Token de Acesso</Label>
                        <Input
                          type="password"
                          value={configs[si.id]?.token || ""}
                          onChange={(e) =>
                            handleConfigChange(si.id, "token", e.target.value)
                          }
                          placeholder="Seu token do Melhor Envio"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={configs[si.id]?.sandboxMode === "true"}
                          onCheckedChange={(v) =>
                            handleConfigChange(si.id, "sandboxMode", v ? "true" : "false")
                          }
                        />
                        <Label>Modo Sandbox (testes)</Label>
                      </div>
                    </div>
                    <Button onClick={() => handleSaveConfig(si.id)}>
                      Salvar Configurações
                    </Button>
                  </div>
                )}

                {si.type === "correios" && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Envio manual via Correios. Para cotação automática de frete,
                      recomendamos usar o Melhor Envio que já inclui os Correios.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Integração com Melhor Envio</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A estrutura está preparada para integração com o Melhor Envio. Quando você
                  adicionar um backend real, o token configurado aqui será utilizado para:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Cotação automática de frete no carrinho</li>
                  <li>Geração de etiquetas de envio</li>
                  <li>Rastreamento automático de encomendas</li>
                  <li>Múltiplas transportadoras em uma única API</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
