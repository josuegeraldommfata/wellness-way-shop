import { Layout } from "@/components/layout/Layout";
import { ShieldCheck, Award, Heart, Truck } from "lucide-react";

const Sobre = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="gradient-hero py-16 md:py-24">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Sobre a LipoImports</h1>
          <p className="text-xl opacity-90 mt-4 max-w-2xl mx-auto">
            Sua parceira na jornada de saúde e bem-estar com produtos importados de qualidade
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Missão</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A LipoImports nasceu com o propósito de democratizar o acesso a produtos importados 
              de alta qualidade para emagrecimento e saúde. Trabalhamos diariamente para oferecer 
              os melhores produtos do mercado internacional, com preço justo e entrega rápida 
              para todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Qualidade</h3>
              <p className="text-muted-foreground text-sm">
                Apenas produtos originais e certificados
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Confiança</h3>
              <p className="text-muted-foreground text-sm">
                Transparência em todas as operações
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cuidado</h3>
              <p className="text-muted-foreground text-sm">
                Atendimento humanizado e personalizado
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Agilidade</h3>
              <p className="text-muted-foreground text-sm">
                Entrega rápida para todo o Brasil
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fundada com a visão de transformar a forma como brasileiros acessam 
                produtos importados para saúde, a LipoImports se consolidou como referência 
                no mercado de produtos para emagrecimento.
              </p>
              <p>
                Nosso time trabalha incansavelmente para selecionar os melhores produtos 
                disponíveis internacionalmente, garantindo origem, qualidade e eficácia. 
                Cada produto passa por rigoroso controle antes de chegar até você.
              </p>
              <p>
                Acreditamos que cuidar da saúde deve ser acessível a todos, por isso 
                oferecemos condições de pagamento facilitadas e uma experiência de compra 
                segura e transparente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Faça parte da nossa comunidade
          </h2>
          <p className="text-muted-foreground mb-6">
            Junte-se a milhares de clientes satisfeitos e transforme sua vida
          </p>
          <a
            href="https://wa.me/5583993396445"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Fale conosco no WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
