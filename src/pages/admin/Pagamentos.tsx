import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData, PaymentMethod } from "@/contexts/StoreDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreditCard, QrCode, Banknote, ExternalLink, Shield } from "lucide-react";
import { toast } from "sonner";

const paymentIcons: Record<string, typeof CreditCard> = {
  mercadopago: CreditCard,
  pix: QrCode,
  boleto: Banknote,
  credit_card: CreditCard,
  stripe: CreditCard,
  paypal: Shield,
  pagseguro: CreditCard,
};

const paymentDescriptions: Record<string, string> = {
  mercadopago: "Cartão de crédito, débito e boleto via Mercado Pago",
  pix: "Pagamento instantâneo via PIX",
  boleto: "Boleto bancário",
  stripe: "Pagamentos internacionais com Stripe",
  paypal: "Pagamentos via PayPal",
  pagseguro: "Pagamentos via PagSeguro",
};

const paymentDocsLinks: Record<string, { label: string; url: string }> = {
  mercadopago: { label: "Obter credenciais no Mercado Pago", url: "https://www.mercadopago.com.br/developers/panel/credentials" },
  stripe: { label: "Obter chaves na Stripe", url: "https://dashboard.stripe.com/apikeys" },
  paypal: { label: "Obter credenciais no PayPal", url: "https://developer.paypal.com/dashboard/applications" },
  pagseguro: { label: "Obter token no PagSeguro", url: "https://pagseguro.uol.com.br/" },
};

interface PaymentConfigField {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const paymentConfigFields: Record<string, PaymentConfigField[]> = {
  mercadopago: [
    { key: "publicKey", label: "Public Key", placeholder: "APP_USR-..." },
    { key: "accessToken", label: "Access Token", type: "password", placeholder: "APP_USR-..." },
  ],
  pix: [
    { key: "pixKey", label: "Chave PIX", placeholder: "email@exemplo.com ou CPF" },
    { key: "pixName", label: "Nome do Beneficiário", placeholder: "Nome que aparecerá no PIX" },
  ],
  stripe: [
    { key: "publishableKey", label: "Publishable Key", placeholder: "pk_test_..." },
    { key: "secretKey", label: "Secret Key", type: "password", placeholder: "sk_test_..." },
  ],
  paypal: [
    { key: "clientId", label: "Client ID", placeholder: "Client ID do PayPal" },
    { key: "clientSecret", label: "Client Secret", type: "password", placeholder: "Client Secret" },
    { key: "sandboxMode", label: "Sandbox Mode (true/false)", placeholder: "true" },
  ],
  pagseguro: [
    { key: "email", label: "Email PagSeguro", placeholder: "seu@email.com" },
    { key: "token", label: "Token", type: "password", placeholder: "Token de integração" },
    { key: "sandboxMode", label: "Sandbox Mode (true/false)", placeholder: "true" },
  ],
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
            const Icon = paymentIcons[pm.type] || CreditCard;
            const fields = paymentConfigFields[pm.type] || [];
            const docsLink = paymentDocsLinks[pm.type];
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
                          {paymentDescriptions[pm.type] || pm.name}
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
                  <div className="space-y-4">
                    {docsLink && (
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          Para integrar com {pm.name}, você precisa das credenciais da sua conta.
                        </p>
                        <a
                          href={docsLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {docsLink.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                    {fields.length > 0 && (
                      <div className="grid gap-4 md:grid-cols-2">
                        {fields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <Label>{field.label}</Label>
                            <Input
                              type={field.type || "text"}
                              value={configs[pm.id]?.[field.key] || ""}
                              onChange={(e) =>
                                handleConfigChange(pm.id, field.key, e.target.value)
                              }
                              placeholder={field.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <Button onClick={() => handleSaveConfig(pm.id)}>
                      Salvar Configurações
                    </Button>
                  </div>
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
                <h3 className="font-medium mb-1">Integrações de Pagamento</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A estrutura está preparada para integração com Mercado Pago, Stripe, PayPal e PagSeguro.
                  Quando você adicionar um backend real, as chaves configuradas aqui serão utilizadas para
                  processar pagamentos.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Gateways disponíveis:</strong> Mercado Pago, Stripe, PayPal, PagSeguro, PIX.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
