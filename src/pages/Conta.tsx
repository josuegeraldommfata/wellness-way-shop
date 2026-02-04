import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

const Conta = () => {
  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Minha Conta
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações e pedidos
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <Tabs defaultValue="perfil" className="space-y-8">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="perfil" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="pedidos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="h-4 w-4 mr-2" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="h-4 w-4 mr-2" />
              Lista de Desejos
            </TabsTrigger>
            <TabsTrigger value="enderecos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              Endereços
            </TabsTrigger>
          </TabsList>

          {/* Profile tab */}
          <TabsContent value="perfil">
            <div className="max-w-2xl">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-6">Dados Pessoais</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <Input id="sobrenome" placeholder="Seu sobrenome" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                  <Button type="submit">Salvar alterações</Button>
                </form>

                <div className="border-t border-border mt-8 pt-6">
                  <h3 className="font-semibold mb-4">Alterar senha</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha atual</Label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nova-senha">Nova senha</Label>
                      <Input id="nova-senha" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                      <Input id="confirmar-senha" type="password" />
                    </div>
                    <Button type="submit" variant="outline">Alterar senha</Button>
                  </form>
                </div>

                <div className="border-t border-border mt-8 pt-6">
                  <Button variant="ghost" className="text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair da conta
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Orders tab */}
          <TabsContent value="pedidos">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">Meus Pedidos</h2>
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Você ainda não tem pedidos.</p>
                <p className="text-sm mt-1">
                  Quando fizer uma compra, seus pedidos aparecerão aqui.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Wishlist tab */}
          <TabsContent value="wishlist">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">Lista de Desejos</h2>
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Sua lista de desejos está vazia.</p>
                <p className="text-sm mt-1">
                  Adicione produtos clicando no coração.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Addresses tab */}
          <TabsContent value="enderecos">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Meus Endereços</h2>
                <Button size="sm">Adicionar endereço</Button>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Você ainda não cadastrou endereços.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="container-custom pb-8">
        <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
          * Esta é uma interface de demonstração. A funcionalidade completa de autenticação será implementada com integração de backend.
        </p>
      </div>
    </Layout>
  );
};

export default Conta;
