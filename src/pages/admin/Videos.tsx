import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData } from "@/contexts/StoreDataContext";
import { VideoTestimonial } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Video, Play } from "lucide-react";
import { toast } from "sonner";

export default function AdminVideos() {
  const { videoTestimonials, addVideo, updateVideo, deleteVideo } = useStoreData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoTestimonial | null>(null);

  const [form, setForm] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    duration: "",
    author: "",
  });

  const openDialog = (video?: VideoTestimonial) => {
    if (video) {
      setEditingVideo(video);
      setForm({
        title: video.title,
        thumbnailUrl: video.thumbnailUrl,
        videoUrl: video.videoUrl,
        duration: video.duration,
        author: video.author,
      });
    } else {
      setEditingVideo(null);
      setForm({
        title: "",
        thumbnailUrl: "",
        videoUrl: "",
        duration: "",
        author: "",
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.thumbnailUrl) {
      toast.error("Título e thumbnail são obrigatórios");
      return;
    }

    if (editingVideo) {
      updateVideo(editingVideo.id, form);
      toast.success("Vídeo atualizado!");
    } else {
      addVideo(form);
      toast.success("Vídeo adicionado!");
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este vídeo?")) {
      deleteVideo(id);
      toast.success("Vídeo excluído!");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vídeos de Feedback</h1>
            <p className="text-muted-foreground">
              Gerencie vídeos de depoimentos de clientes
            </p>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Vídeo
          </Button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoTestimonials.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img
                  src={video.thumbnailUrl || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration || "0:00"}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{video.author}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openDialog(video)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(video.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {videoTestimonials.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum vídeo cadastrado</h3>
              <p className="text-muted-foreground mb-4">
                Adicione vídeos de depoimentos de clientes para exibir na loja
              </p>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Vídeo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Video Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingVideo ? "Editar Vídeo" : "Novo Vídeo"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Thumbnail (imagem de capa) *</Label>
                <ImageUpload
                  value={form.thumbnailUrl}
                  onChange={(v) => setForm((p) => ({ ...p, thumbnailUrl: v }))}
                  aspectRatio="banner"
                  placeholder="Adicionar imagem de capa do vídeo"
                />
              </div>

              <div className="space-y-2">
                <Label>Título *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Unboxing do pedido"
                />
              </div>

              <div className="space-y-2">
                <Label>Autor</Label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                  placeholder="@cliente_satisfeita"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL do Vídeo (YouTube/Vimeo)</Label>
                  <Input
                    value={form.videoUrl}
                    onChange={(e) => setForm((p) => ({ ...p, videoUrl: e.target.value }))}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duração</Label>
                  <Input
                    value={form.duration}
                    onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="0:45"
                  />
                </div>
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
