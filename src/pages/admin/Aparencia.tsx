import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RotateCcw, Palette, Type, Image, Share2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ColorPicker } from "@/components/admin/ColorPicker";

export default function AdminAparencia() {
  const { settings, updateSettings, resetSettings } = useSiteSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key: keyof typeof settings, value: string) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleNavLinkChange = (index: number, field: "name" | "href", value: string) => {
    const newLinks = [...localSettings.navbarLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLocalSettings((prev) => ({ ...prev, navbarLinks: newLinks }));
  };

  const addNavLink = () => {
    setLocalSettings((prev) => ({
      ...prev,
      navbarLinks: [...prev.navbarLinks, { name: "Novo Link", href: "/loja" }],
    }));
  };

  const removeNavLink = (index: number) => {
    const newLinks = localSettings.navbarLinks.filter((_, i) => i !== index);
    setLocalSettings((prev) => ({ ...prev, navbarLinks: newLinks }));
  };

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success("Configurações salvas com sucesso!");
  };

  const handleReset = () => {
    resetSettings();
    setLocalSettings(settings);
    toast.info("Configurações restauradas para o padrão");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Aparência</h1>
            <p className="text-muted-foreground">Personalize cores, textos e layout da loja</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restaurar
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cores" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="cores">Cores</TabsTrigger>
            <TabsTrigger value="textos">Textos</TabsTrigger>
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="redes">Redes Sociais</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="cores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Cores do Site
                </CardTitle>
                <CardDescription>
                  Defina as cores principais do e-commerce (formato HSL: "217 91% 55%")
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ColorPicker
                    label="Cor Primária"
                    description="Header, botões, links"
                    value={localSettings.primaryColor}
                    onChange={(v) => handleChange("primaryColor", v)}
                  />
                  <ColorPicker
                    label="Cor Secundária"
                    description="Fundos, cards, destaque leve"
                    value={localSettings.secondaryColor}
                    onChange={(v) => handleChange("secondaryColor", v)}
                  />
                  <ColorPicker
                    label="Cor de Destaque"
                    description="CTAs, sucesso, WhatsApp"
                    value={localSettings.accentColor}
                    onChange={(v) => handleChange("accentColor", v)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Texts Tab */}
          <TabsContent value="textos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Textos e Branding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nome do Site</Label>
                    <Input
                      value={localSettings.siteName}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Texto da Barra Superior</Label>
                    <Input
                      value={localSettings.topBarText}
                      onChange={(e) => handleChange("topBarText", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Logo do Site (upload de imagem)</Label>
                  <ImageUpload
                    value={localSettings.logoUrl}
                    onChange={(v) => handleChange("logoUrl", v)}
                    aspectRatio="auto"
                    placeholder="Envie a logo do e-commerce (PNG/JPG)"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Navbar Tab */}
          <TabsContent value="navbar">
            <Card>
              <CardHeader>
                <CardTitle>Links da Navegação</CardTitle>
                <CardDescription>Configure os links do menu principal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {localSettings.navbarLinks.map((link, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label>Nome</Label>
                      <Input
                        value={link.name}
                        onChange={(e) => handleNavLinkChange(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={link.href}
                        onChange={(e) => handleNavLinkChange(index, "href", e.target.value)}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeNavLink(index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addNavLink}>
                  + Adicionar Link
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Redes Sociais Tab */}
          <TabsContent value="redes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Redes Sociais
                </CardTitle>
                <CardDescription>Configure os links das suas redes sociais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Instagram URL</Label>
                  <Input
                    value={localSettings.footerInstagram}
                    onChange={(e) => handleChange("footerInstagram", e.target.value)}
                    placeholder="https://instagram.com/suapagina"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Facebook URL</Label>
                    <Input
                      value={localSettings.footerFacebook}
                      onChange={(e) => handleChange("footerFacebook", e.target.value)}
                      placeholder="https://facebook.com/suapagina"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube URL</Label>
                    <Input
                      value={localSettings.footerYoutube}
                      onChange={(e) => handleChange("footerYoutube", e.target.value)}
                      placeholder="https://youtube.com/@seucanal"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Footer</CardTitle>
                <CardDescription>Configure textos e contatos do rodapé</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Texto Sobre Nós</Label>
                  <Textarea
                    value={localSettings.footerAboutText}
                    onChange={(e) => handleChange("footerAboutText", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>WhatsApp</Label>
                    <Input
                      value={localSettings.footerPhone}
                      onChange={(e) => handleChange("footerPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={localSettings.footerEmail}
                      onChange={(e) => handleChange("footerEmail", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
