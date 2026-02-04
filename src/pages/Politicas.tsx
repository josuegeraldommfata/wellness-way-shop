import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Politicas = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="gradient-hero py-16">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Políticas e Termos</h1>
          <p className="text-xl opacity-90 mt-4">
            Transparência e segurança para você
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <Tabs defaultValue="termos" className="max-w-4xl mx-auto">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
            <TabsTrigger value="termos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Termos de Uso
            </TabsTrigger>
            <TabsTrigger value="privacidade" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Política de Privacidade
            </TabsTrigger>
            <TabsTrigger value="troca" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Trocas e Devoluções
            </TabsTrigger>
            <TabsTrigger value="envio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Política de Envio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="termos" className="prose prose-gray max-w-none">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Termos de Uso</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Bem-vindo à LipoImports. Ao acessar e utilizar nosso site, você concorda com os 
                  seguintes termos e condições. Por favor, leia atentamente.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">1. Uso do Site</h3>
                <p>
                  O conteúdo deste site é destinado apenas para fins informativos e comerciais. 
                  O uso indevido de qualquer parte do site é estritamente proibido.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">2. Produtos</h3>
                <p>
                  Todos os produtos comercializados são importados e originais. Nos reservamos 
                  o direito de limitar quantidades ou recusar pedidos a nosso critério.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">3. Preços</h3>
                <p>
                  Os preços podem ser alterados sem aviso prévio. Promoções são válidas 
                  enquanto durarem os estoques.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">4. Responsabilidade</h3>
                <p>
                  Os produtos comercializados são destinados ao uso conforme indicação 
                  médica. A LipoImports não se responsabiliza pelo uso inadequado dos produtos.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacidade">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Política de Privacidade</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A LipoImports está comprometida em proteger sua privacidade. Esta política 
                  descreve como coletamos, usamos e protegemos suas informações pessoais.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">Coleta de Dados</h3>
                <p>
                  Coletamos informações quando você faz um pedido, se cadastra em nosso site, 
                  ou entra em contato conosco. Isso inclui nome, email, telefone e endereço.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">Uso das Informações</h3>
                <p>
                  Utilizamos seus dados para processar pedidos, enviar atualizações sobre 
                  entregas, e melhorar nossos serviços.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">Proteção de Dados</h3>
                <p>
                  Implementamos medidas de segurança para proteger suas informações contra 
                  acesso não autorizado.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="troca">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Trocas e Devoluções</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Prazo</h3>
                <p>
                  Você tem até 7 dias após o recebimento do produto para solicitar troca ou 
                  devolução, conforme o Código de Defesa do Consumidor.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">Condições</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>O produto deve estar lacrado e na embalagem original</li>
                  <li>Produtos abertos ou utilizados não são aceitos para devolução</li>
                  <li>Produtos refrigerados possuem condições especiais</li>
                </ul>
                <h3 className="text-lg font-semibold text-foreground mt-6">Processo</h3>
                <p>
                  Entre em contato via WhatsApp para iniciar o processo de troca ou devolução. 
                  Nossa equipe irá orientá-lo sobre os próximos passos.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="envio">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Política de Envio</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Prazos de Entrega</h3>
                <p>
                  Os prazos variam de acordo com a localidade. Em geral, entregamos em:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Capitais: 3 a 7 dias úteis</li>
                  <li>Interior: 5 a 12 dias úteis</li>
                  <li>Regiões remotas: consulte prazo específico</li>
                </ul>
                <h3 className="text-lg font-semibold text-foreground mt-6">Rastreamento</h3>
                <p>
                  Após o envio, você receberá o código de rastreamento via WhatsApp para 
                  acompanhar sua entrega em tempo real.
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-6">Embalagem</h3>
                <p>
                  Todos os produtos são embalados com cuidado, garantindo a integridade e 
                  a discrição da entrega.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Politicas;
