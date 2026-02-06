import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Tag, Percent, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Coupon } from "@/contexts/CartContext";
import { formatPrice } from "@/data/mockData";

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function AdminCupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const stored = localStorage.getItem("lipoimports_coupons");
    return stored ? JSON.parse(stored) : [];
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [form, setForm] = useState<Omit<Coupon, "id" | "usedCount">>({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: undefined,
    maxUses: undefined,
    isActive: true,
    expiresAt: undefined,
  });

  const persist = (data: Coupon[]) => {
    localStorage.setItem("lipoimports_coupons", JSON.stringify(data));
    setCoupons(data);
  };

  const openDialog = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setForm({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minPurchase: coupon.minPurchase,
        maxUses: coupon.maxUses,
        isActive: coupon.isActive,
        expiresAt: coupon.expiresAt,
      });
    } else {
      setEditingCoupon(null);
      setForm({
        code: "",
        discountType: "percentage",
        discountValue: 10,
        minPurchase: undefined,
        maxUses: undefined,
        isActive: true,
        expiresAt: undefined,
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.code || form.discountValue <= 0) {
      toast.error("Código e valor do desconto são obrigatórios");
      return;
    }

    // Check for duplicate code
    const existingCode = coupons.find(
      (c) => c.code.toLowerCase() === form.code.toLowerCase() && c.id !== editingCoupon?.id
    );
    if (existingCode) {
      toast.error("Já existe um cupom com este código");
      return;
    }

    if (editingCoupon) {
      const updated = coupons.map((c) =>
        c.id === editingCoupon.id ? { ...c, ...form } : c
      );
      persist(updated);
      toast.success("Cupom atualizado!");
    } else {
      const newCoupon: Coupon = {
        ...form,
        id: generateId(),
        usedCount: 0,
      };
      persist([...coupons, newCoupon]);
      toast.success("Cupom criado!");
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cupom?")) {
      persist(coupons.filter((c) => c.id !== id));
      toast.success("Cupom excluído!");
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, isActive } : c));
    persist(updated);
    toast.success(isActive ? "Cupom ativado!" : "Cupom desativado!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cupons de Desconto</h1>
            <p className="text-muted-foreground">
              Gerencie cupons promocionais da loja
            </p>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cupom
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Desconto</TableHead>
                  <TableHead>Compra Mínima</TableHead>
                  <TableHead>Usos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-mono font-bold uppercase">
                          {coupon.code}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {coupon.discountType === "percentage" ? (
                          <>
                            <Percent className="h-4 w-4 text-muted-foreground" />
                            <span>{coupon.discountValue}%</span>
                          </>
                        ) : (
                          <>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{formatPrice(coupon.discountValue)}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {coupon.minPurchase
                        ? formatPrice(coupon.minPurchase)
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {coupon.usedCount}
                      {coupon.maxUses && ` / ${coupon.maxUses}`}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={coupon.isActive}
                        onCheckedChange={(v) => handleToggleActive(coupon.id, v)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDialog(coupon)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(coupon.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {coupons.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum cupom cadastrado. Clique em "Novo Cupom" para criar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Coupon Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Editar Cupom" : "Novo Cupom"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Código do Cupom *</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                  placeholder="DESCONTO10"
                  className="font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Desconto</Label>
                  <Select
                    value={form.discountType}
                    onValueChange={(v: "percentage" | "fixed") =>
                      setForm((p) => ({ ...p, discountType: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor *</Label>
                  <Input
                    type="number"
                    value={form.discountValue}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, discountValue: Number(e.target.value) }))
                    }
                    placeholder={form.discountType === "percentage" ? "10" : "50"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Compra Mínima (R$)</Label>
                  <Input
                    type="number"
                    value={form.minPurchase || ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        minPurchase: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    placeholder="Opcional"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Limite de Usos</Label>
                  <Input
                    type="number"
                    value={form.maxUses || ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        maxUses: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    placeholder="Ilimitado"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data de Expiração</Label>
                <Input
                  type="date"
                  value={form.expiresAt ? form.expiresAt.split("T")[0] : ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      expiresAt: e.target.value ? `${e.target.value}T23:59:59Z` : undefined,
                    }))
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))}
                />
                <Label>Cupom ativo</Label>
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
