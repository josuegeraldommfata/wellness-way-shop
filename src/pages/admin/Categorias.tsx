import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData, SubCategory } from "@/contexts/StoreDataContext";
import { Category } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategorias() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    subCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  } = useStoreData();

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [subCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "/placeholder.svg",
  });

  const [subCategoryForm, setSubCategoryForm] = useState({
    name: "",
    slug: "",
    parentCategoryId: "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openCategoryDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: "", slug: "", description: "", image: "/placeholder.svg" });
    }
    setCategoryDialogOpen(true);
  };

  const openSubCategoryDialog = (subCategory?: SubCategory) => {
    if (subCategory) {
      setEditingSubCategory(subCategory);
      setSubCategoryForm({
        name: subCategory.name,
        slug: subCategory.slug,
        parentCategoryId: subCategory.parentCategoryId,
      });
    } else {
      setEditingSubCategory(null);
      setSubCategoryForm({ name: "", slug: "", parentCategoryId: "" });
    }
    setSubCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name) {
      toast.error("Nome é obrigatório");
      return;
    }

    const slug = categoryForm.slug || generateSlug(categoryForm.name);

    if (editingCategory) {
      updateCategory(editingCategory.id, { ...categoryForm, slug });
      toast.success("Categoria atualizada!");
    } else {
      addCategory({ ...categoryForm, slug });
      toast.success("Categoria criada!");
    }

    setCategoryDialogOpen(false);
  };

  const handleSaveSubCategory = () => {
    if (!subCategoryForm.name || !subCategoryForm.parentCategoryId) {
      toast.error("Nome e categoria pai são obrigatórios");
      return;
    }

    const slug = subCategoryForm.slug || generateSlug(subCategoryForm.name);

    if (editingSubCategory) {
      updateSubCategory(editingSubCategory.id, { ...subCategoryForm, slug });
      toast.success("Subcategoria atualizada!");
    } else {
      addSubCategory({ ...subCategoryForm, slug });
      toast.success("Subcategoria criada!");
    }

    setSubCategoryDialogOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      deleteCategory(id);
      toast.success("Categoria excluída!");
    }
  };

  const handleDeleteSubCategory = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta subcategoria?")) {
      deleteSubCategory(id);
      toast.success("Subcategoria excluída!");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
            <p className="text-muted-foreground">Gerencie categorias e subcategorias</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => openSubCategoryDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Subcategoria
            </Button>
            <Button onClick={() => openCategoryDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </div>
        </div>

        {/* Categories List */}
        <div className="grid gap-4">
          {categories.map((category) => {
            const subs = subCategories.filter((s) => s.parentCategoryId === category.id);
            return (
              <Card key={category.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderTree className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">/{category.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openCategoryDialog(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {subs.length > 0 && (
                  <CardContent>
                    <p className="text-sm font-medium mb-2">Subcategorias:</p>
                    <div className="flex flex-wrap gap-2">
                      {subs.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm"
                        >
                          <span>{sub.name}</span>
                          <button
                            onClick={() => openSubCategoryDialog(sub)}
                            className="hover:text-primary"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubCategory(sub.id)}
                            className="hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Category Dialog */}
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: Vitaminas"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="vitaminas"
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={categoryForm.description}
                  onChange={(e) =>
                    setCategoryForm((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveCategory}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Subcategory Dialog */}
        <Dialog open={subCategoryDialogOpen} onOpenChange={setSubCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSubCategory ? "Editar Subcategoria" : "Nova Subcategoria"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Categoria Pai</Label>
                <Select
                  value={subCategoryForm.parentCategoryId}
                  onValueChange={(v) =>
                    setSubCategoryForm((p) => ({ ...p, parentCategoryId: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={subCategoryForm.name}
                  onChange={(e) =>
                    setSubCategoryForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Ex: Vitamina D"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={subCategoryForm.slug}
                  onChange={(e) =>
                    setSubCategoryForm((p) => ({ ...p, slug: e.target.value }))
                  }
                  placeholder="vitamina-d"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSubCategoryDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveSubCategory}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
