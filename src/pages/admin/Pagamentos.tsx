import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData, PaymentMethod } from "@/contexts/StoreDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreditCard, QrCode, Banknote, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const paymentIcons = {
  mercadopago: CreditCard,
  pix: QrCode,
  boleto: Banknote,
  credit_card: CreditCard,
};

export default function AdminPagamentos() {
  const { paymentMethods, updatePaymentMethod } = useStoreData();

  const [configs, setConfigs] = useState<Record<string, PaymentMethod["config"]>>(
    paymentMethods.reduce((acc, pm) => ({ ...acc, [pm.id]: pm.config }), {})
  );

  const handleToggle = (id: string, enabled: boolean) => {
    updatePaymentMethod(id, { enabled });
    toast.success(enabled ? "Método de pagamento ativado" : "Método de pagamento desativado");
  };

  const handleConfigChange = (id: string, key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const handleSaveConfig = (id: string) => {
    updatePaymentMethod(id, { config: configs[id] });
    toast.success("Configurações salvas!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pagamentos</h1>
          <p className="text-muted-foreground">
            Configure os métodos de pagamento da sua loja
          </p>
        </div>

        <div className="grid gap-6">
          {paymentMethods.map((pm) => {
            const Icon = paymentIcons[pm.type];
            return (
              <Card key={pm.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pm.name}</CardTitle>
                        <CardDescription>
                          {pm.type === "mercadopago" && "Cartão de crédito, débito e boleto"}
                          {pm.type === "pix" && "Pagamento instantâneo via PIX"}
                          {pm.type === "boleto" && "Boleto bancário"}
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={pm.enabled}
                      onCheckedChange={(v) => handleToggle(pm.id, v)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {pm.type === "mercadopago" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          Para integrar com Mercado Pago, você precisa das credenciais da sua conta.
                        </p>
                        <a
                          href="https://www.mercadopago.com.br/developers/panel/credentials"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Obter credenciais no Mercado Pago
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Public Key</Label>
                          <Input
                            value={configs[pm.id]?.publicKey || ""}
                            onChange={(e) =>
                              handleConfigChange(pm.id, "publicKey", e.target.value)
                            }
                            placeholder="APP_USR-..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Access Token</Label>
                          <Input
                            type="password"
                            value={configs[pm.id]?.accessToken || ""}
                            onChange={(e) =>
                              handleConfigChange(pm.id, "accessToken", e.target.value)
                            }
                            placeholder="APP_USR-..."
                          />
                        </div>
                      </div>
                      <Button onClick={() => handleSaveConfig(pm.id)}>
                        Salvar Configurações
                      </Button>
                    </div>
                  )}

                  {pm.type === "pix" && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Chave PIX</Label>
                          <Input
                            value={configs[pm.id]?.pixKey || ""}
                            onChange={(e) =>
                              handleConfigChange(pm.id, "pixKey", e.target.value)
                            }
                            placeholder="email@exemplo.com ou CPF"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nome do Beneficiário</Label>
                          <Input
                            value={configs[pm.id]?.pixName || ""}
                            onChange={(e) =>
                              handleConfigChange(pm.id, "pixName", e.target.value)
                            }
                            placeholder="Nome que aparecerá no PIX"
                          />
                        </div>
                      </div>
                      <Button onClick={() => handleSaveConfig(pm.id)}>
                        Salvar Configurações
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Integração com Mercado Pago</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A estrutura está preparada para integração com o Mercado Pago. Quando você
                  adicionar um backend real, as chaves configuradas aqui serão utilizadas para
                  processar pagamentos.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Funcionalidades disponíveis:</strong> Cartão de crédito, débito, PIX,
                  boleto, parcelamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
