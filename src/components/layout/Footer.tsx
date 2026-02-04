import { Link } from "react-router-dom";
import { Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-highlight text-highlight-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre nós</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              A LipoImports oferece produtos importados de qualidade para auxiliar no emagrecimento, 
              com preço justo e entrega rápida em todo o Brasil.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Institutional */}
          <div>
            <h3 className="text-lg font-bold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/loja" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Loja
                </Link>
              </li>
              <li>
                <Link to="/conta" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Minha conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/conta" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Minha conta
                </Link>
              </li>
              <li>
                <Link to="/contato" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="opacity-90 hover:opacity-100 hover:underline transition-all">
                  Políticas e Termos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp:</p>
                  <a
                    href="https://wa.me/5583993396445"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-90 hover:opacity-100 hover:underline"
                  >
                    (83) 99339-6445
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <a
                    href="mailto:contato@lipoimports.com.br"
                    className="opacity-90 hover:opacity-100 hover:underline"
                  >
                    contato@lipoimports.com.br
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20">
        <div className="container-custom py-4 text-center text-sm opacity-80">
          Copyright © 2025 – LipoImports. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
