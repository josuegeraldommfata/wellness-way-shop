import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData } from "@/contexts/StoreDataContext";
import { Product, formatPrice } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminProdutos() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useStoreData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: 0,
    originalPrice: undefined,
    installments: 12,
    installmentPrice: 0,
    images: ["/placeholder.svg"],
    category: "",
    brand: "",
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    tags: [],
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        originalPrice: product.originalPrice,
        installments: product.installments,
        installmentPrice: product.installmentPrice,
        images: product.images,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        isFeatured: product.isFeatured,
        isBestSeller: product.isBestSeller,
        tags: product.tags,
      });
    } else {
      setEditingProduct(null);
      setForm({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        price: 0,
        originalPrice: undefined,
        installments: 12,
        installmentPrice: 0,
        images: ["/placeholder.svg"],
        category: "",
        brand: "",
        inStock: true,
        isFeatured: false,
        isBestSeller: false,
        tags: [],
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category || form.price <= 0) {
      toast.error("Preencha nome, categoria e preço");
      return;
    }

    const slug = form.slug || generateSlug(form.name);
    const installmentPrice = form.price / form.installments;

    const productData = {
      ...form,
      slug,
      installmentPrice,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success("Produto atualizado!");
    } else {
      addProduct(productData);
      toast.success("Produto criado!");
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
      toast.success("Produto excluído!");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
            <p className="text-muted-foreground">{products.length} produtos cadastrados</p>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover bg-muted"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {categories.find((c) => c.slug === product.category)?.name || product.category}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatPrice(product.price)}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.installments}x de {formatPrice(product.installmentPrice)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {product.inStock ? (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full w-fit">
                            Em estoque
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full w-fit">
                            Sem estoque
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full w-fit">
                            Destaque
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDialog(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Product Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="MOUNJARO 15mg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Marca</Label>
                  <Input
                    value={form.brand}
                    onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                    placeholder="Eli Lilly"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    placeholder="mounjaro-15mg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição curta</Label>
                <Input
                  value={form.shortDescription}
                  onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                  placeholder="Tirzepatida 15mg - Aplicação semanal"
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição completa</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Preço *</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preço original</Label>
                  <Input
                    type="number"
                    value={form.originalPrice || ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        originalPrice: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    placeholder="Opcional"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Parcelas</Label>
                  <Input
                    type="number"
                    value={form.installments}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, installments: Number(e.target.value) }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={form.images[0]}
                  onChange={(e) => setForm((p) => ({ ...p, images: [e.target.value] }))}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.inStock}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, inStock: v }))}
                  />
                  <Label>Em estoque</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.isFeatured}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, isFeatured: v }))}
                  />
                  <Label>Destaque</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.isBestSeller}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, isBestSeller: v }))}
                  />
                  <Label>Mais vendido</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
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
