import { Link } from "react-router-dom";
import { Instagram, Phone, Mail, Facebook, Youtube, MapPin } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function Footer() {
  const { settings } = useSiteSettings();
  const phoneNumber = settings.footerPhone.replace(/\D/g, "");

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-8 mb-3 brightness-0 invert" />
            ) : (
              <h3 className="text-lg font-bold mb-3">{settings.siteName}</h3>
            )}
            <p className="text-sm opacity-70 leading-relaxed">
              {settings.footerAboutText}
            </p>
            <div className="flex gap-2 mt-4">
              {settings.footerInstagram && (
                <a href={settings.footerInstagram} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {settings.footerFacebook && (
                <a href={settings.footerFacebook} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings.footerYoutube && (
                <a href={settings.footerYoutube} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-80">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="opacity-70 hover:opacity-100 transition-opacity">Sobre nós</Link></li>
              <li><Link to="/loja" className="opacity-70 hover:opacity-100 transition-opacity">Loja</Link></li>
              <li><Link to="/contato" className="opacity-70 hover:opacity-100 transition-opacity">Contato</Link></li>
              <li><Link to="/politicas" className="opacity-70 hover:opacity-100 transition-opacity">Políticas</Link></li>
            </ul>
          </div>

          {/* Minha Conta */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-80">Minha Conta</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/conta" className="opacity-70 hover:opacity-100 transition-opacity">Meus pedidos</Link></li>
              <li><Link to="/carrinho" className="opacity-70 hover:opacity-100 transition-opacity">Carrinho</Link></li>
              <li><Link to="/login" className="opacity-70 hover:opacity-100 transition-opacity">Entrar</Link></li>
              <li><Link to="/cadastro" className="opacity-70 hover:opacity-100 transition-opacity">Criar conta</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-80">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`https://wa.me/55${phoneNumber}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <Phone className="h-4 w-4 shrink-0" />
                  {settings.footerPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.footerEmail}`}
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <Mail className="h-4 w-4 shrink-0" />
                  {settings.footerEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-60">
          <span>© {new Date().getFullYear()} {settings.siteName}. Todos os direitos reservados.</span>
          <span>Desenvolvido por Agência Info Tech</span>
        </div>
      </div>
    </footer>
  );
}
