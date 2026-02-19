import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const Contato = () => {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });

  // Remove all non-digits from phone number
  const phoneNumber = settings.footerPhone.replace(/\D/g, "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message
    const mensagem = `*Nova mensagem do site:*%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Telefone:* ${formData.telefone || "Não informado"}%0A` +
      `*Assunto:* ${formData.assunto}%0A%0A` +
      `*Mensagem:*%0A${formData.mensagem}`;

    // Redirect to WhatsApp
    window.open(`https://wa.me/55${phoneNumber}?text=${mensagem}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="gradient-hero py-16">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Contato</h1>
          <p className="text-xl opacity-90 mt-4">
            Estamos aqui para ajudar você
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Envie uma mensagem
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assunto">Assunto *</Label>
                <Input
                  id="assunto"
                  placeholder="Como podemos ajudar?"
                  required
                  value={formData.assunto}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem *</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Descreva sua dúvida ou solicitação..."
                  rows={5}
                  required
                  value={formData.mensagem}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar mensagem via WhatsApp
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">
              * Sua mensagem será enviada diretamente para nosso WhatsApp.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Informações de Contato
            </h2>

            <div className="space-y-6">
              {/* WhatsApp - Main CTA */}
              <a
                href={`https://wa.me/55${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-accent/10 border-2 border-accent rounded-xl hover:bg-accent/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent text-lg">WhatsApp</h3>
                    <p className="text-foreground font-medium">{settings.footerPhone}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Atendimento rápido e personalizado
                    </p>
                  </div>
                </div>
              </a>

              {/* Other contacts */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-muted-foreground">{settings.footerPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href={`mailto:${settings.footerEmail}`} className="text-muted-foreground hover:underline">
                      {settings.footerEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Atendimento</h3>
                    <p className="text-muted-foreground">Entregamos para todo o Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
