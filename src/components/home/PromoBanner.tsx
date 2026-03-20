import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function PromoBanner() {
  const { settings } = useSiteSettings();
  const phoneNumber = settings.footerPhone.replace(/\D/g, "");

  return (
    <section className="py-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Banner 1 */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 md:p-8 min-h-[180px] flex items-center">
            <div className="relative z-10 text-white">
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Novidades</p>
              <h3 className="text-xl md:text-2xl font-bold mt-1">
                Canetas Emagrecedoras
              </h3>
              <p className="text-sm opacity-80 mt-1">Resultados comprovados</p>
              <Button
                size="sm"
                className="mt-4 bg-white text-primary hover:bg-white/90 rounded-full font-semibold"
                asChild
              >
                <Link to="/loja?categoria=canetas-emagrecedoras">Confira</Link>
              </Button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full" />
          </div>

          {/* Banner 2 */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent to-accent/80 p-6 md:p-8 min-h-[180px] flex items-center">
            <div className="relative z-10 text-accent-foreground">
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Comunidade</p>
              <h3 className="text-xl md:text-2xl font-bold mt-1">
                Grupo VIP de Clientes
              </h3>
              <p className="text-sm opacity-80 mt-1">Ofertas exclusivas no WhatsApp</p>
              <Button
                size="sm"
                className="mt-4 bg-white text-accent hover:bg-white/90 rounded-full font-semibold"
                asChild
              >
                <a href={`https://wa.me/55${phoneNumber}`} target="_blank" rel="noopener noreferrer">
                  Participar
                </a>
              </Button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
