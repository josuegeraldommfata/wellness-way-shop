import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData } from "@/contexts/StoreDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Banner } from "@/data/mockData";

export default function AdminBanners() {
  const { banners, addBanner, updateBanner, deleteBanner, reorderBanners } = useStoreData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [form, setForm] = useState<Omit<Banner, "id" | "order">>({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: "",
    mobileImage: "",
    isActive: true,
  });

  const openDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setForm({
        title: banner.title,
        subtitle: banner.subtitle || "",
        buttonText: banner.buttonText || "",
        buttonLink: banner.buttonLink || "",
        image: banner.image,
        mobileImage: banner.mobileImage || "",
        isActive: banner.isActive,
      });
    } else {
      setEditingBanner(null);
      setForm({
        title: "",
        subtitle: "",
        buttonText: "",
        buttonLink: "",
        image: "",
        mobileImage: "",
        isActive: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.image) {
      toast.error("Preencha o título e adicione uma imagem");
      return;
    }

    if (editingBanner) {
      updateBanner(editingBanner.id, form);
      toast.success("Banner atualizado!");
    } else {
      addBanner(form);
      toast.success("Banner criado!");
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      deleteBanner(id);
      toast.success("Banner excluído!");
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateBanner(id, { isActive });
    toast.success(isActive ? "Banner ativado!" : "Banner desativado!");
  };

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Banners / Slides</h1>
            <p className="text-muted-foreground">
              Gerencie os slides do carrossel principal
            </p>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Banner
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Banners Ativos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBanners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    </TableCell>
                    <TableCell>
                      <div className="w-32 aspect-[3/1] rounded overflow-hidden bg-muted">
                        <img
                          src={banner.image || "/placeholder.svg"}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{banner.title}</p>
                        {banner.subtitle && (
                          <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {banner.buttonLink ? (
                        <span className="text-sm text-muted-foreground">{banner.buttonLink}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground/50">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(banner.id, !banner.isActive)}
                        className={banner.isActive ? "text-green-600" : "text-muted-foreground"}
                      >
                        {banner.isActive ? (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Ativo
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Inativo
                          </>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDialog(banner)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(banner.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {banners.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum banner cadastrado. Clique em "Novo Banner" para adicionar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Banner Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Editar Banner" : "Novo Banner"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Desktop Image */}
              <div className="space-y-2">
                <Label>Imagem Desktop (1920x600 recomendado) *</Label>
                <ImageUpload
                  value={form.image}
                  onChange={(v) => setForm((p) => ({ ...p, image: v }))}
                  aspectRatio="banner"
                  placeholder="Arraste ou clique para adicionar imagem do banner"
                />
              </div>

              {/* Mobile Image */}
              <div className="space-y-2">
                <Label>Imagem Mobile (opcional - 768x500 recomendado)</Label>
                <ImageUpload
                  value={form.mobileImage || ""}
                  onChange={(v) => setForm((p) => ({ ...p, mobileImage: v }))}
                  aspectRatio="square"
                  placeholder="Imagem otimizada para celular"
                />
                <p className="text-xs text-muted-foreground">
                  Se não enviar, a imagem desktop será usada em todos os dispositivos.
                </p>
              </div>

              {/* Text Content */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Título *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Promoção de Verão"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input
                    value={form.subtitle || ""}
                    onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                    placeholder="Até 50% de desconto em produtos selecionados"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Texto do Botão</Label>
                  <Input
                    value={form.buttonText || ""}
                    onChange={(e) => setForm((p) => ({ ...p, buttonText: e.target.value }))}
                    placeholder="Comprar Agora"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link do Botão</Label>
                  <Input
                    value={form.buttonLink || ""}
                    onChange={(e) => setForm((p) => ({ ...p, buttonLink: e.target.value }))}
                    placeholder="/loja"
                  />
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))}
                />
                <Label>Banner ativo</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
