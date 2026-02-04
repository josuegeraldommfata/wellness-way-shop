import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Background gradient - Azul */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Saúde e bem-estar"
          className="w-full h-full object-cover object-right opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-custom h-full flex items-center py-16 md:py-24">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            EMAGREÇA COM
            <br />
            <span className="text-white/90">QUALIDADE E SEGURANÇA</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl opacity-90 leading-relaxed">
            Produtos importados, originais e com entrega rápida para transformar sua rotina.
          </p>
          <Button
            variant="success"
            size="xl"
            className="mt-8 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link to="/loja">
              <ShoppingCart className="h-5 w-5" />
              COMPRAR AGORA
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
