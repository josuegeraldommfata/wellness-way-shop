import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Frete Grátis",
    description: "Em compras acima de R$ 299",
  },
  {
    icon: ShieldCheck,
    title: "Compra Segura",
    description: "Ambiente 100% protegido",
  },
  {
    icon: CreditCard,
    title: "Até 12x",
    description: "Parcele sem juros",
  },
  {
    icon: Headphones,
    title: "Atendimento",
    description: "Suporte via WhatsApp",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-4 px-3 md:px-6"
            >
              <benefit.icon className="h-6 w-6 md:h-7 md:w-7 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs md:text-sm truncate">{benefit.title}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground truncate">
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
