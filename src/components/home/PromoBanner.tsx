import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main banner */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl gradient-hero min-h-[250px] flex items-center p-8">
            <div className="relative z-10 text-white max-w-md">
              <span className="text-sm font-medium opacity-90">Canetas Emagrecedoras</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2">
                Resultados rápidos e eficazes
              </h3>
              <Button variant="secondary" size="lg" className="mt-6" asChild>
                <Link to="/loja?categoria=canetas-emagrecedoras">
                  ver produtos
                </Link>
              </Button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>

          {/* Side banner */}
          <div className="relative overflow-hidden rounded-2xl bg-accent min-h-[250px] flex items-center p-8">
            <div className="relative z-10 text-accent-foreground">
              <span className="text-sm font-medium opacity-90">Fique por dentro</span>
              <h3 className="text-xl font-bold mt-2">
                Grupo de Clientes e Indicações
              </h3>
              <Button variant="secondary" size="default" className="mt-4" asChild>
                <a href="https://wa.me/5583993396445" target="_blank" rel="noopener noreferrer">
                  Quero participar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
