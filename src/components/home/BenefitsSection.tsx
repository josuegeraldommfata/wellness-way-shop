import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Seu pedido entregue em poucos dias para todo o Brasil",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade Garantida",
    description: "Produtos importados com eficácia comprovada",
  },
  {
    icon: CreditCard,
    title: "Pagamento Seguro",
    description: "Ambiente protegido para suas transações",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-12 bg-muted">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-card"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
