import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStoreData, Order } from "@/contexts/StoreDataContext";
import { formatPrice } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Search, Eye, Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-700", icon: Package },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function AdminPedidos() {
  const { orders, updateOrder } = useStoreData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleUpdateStatus = (status: Order["status"]) => {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, { status });
      setSelectedOrder({ ...selectedOrder, status });
      toast.success("Status atualizado!");
    }
  };

  const handleUpdateTracking = (trackingCode: string) => {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, { trackingCode });
      setSelectedOrder({ ...selectedOrder, trackingCode });
      toast.success("Código de rastreio salvo!");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = filteredOrders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground">{orders.length} pedidos no total</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => {
                  const status = statusConfig[order.status];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {order.customerName} {order.customerLastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {order.items.map((i) => `${i.quantity}x ${i.productName}`).join(", ")}
                        </p>
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openDialog(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Dados do Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nome</p>
                      <p className="font-medium">
                        {selectedOrder.customerName} {selectedOrder.customerLastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">WhatsApp</p>
                      <p className="font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CEP</p>
                      <p className="font-medium">{selectedOrder.customerCep}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Endereço</p>
                      <p className="font-medium">
                        {selectedOrder.customerAddress}, {selectedOrder.customerNeighborhood} -{" "}
                        {selectedOrder.customerCity}/{selectedOrder.customerState}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Itens do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                          </div>
                          <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 border-t">
                        <p className="font-bold text-lg">Total</p>
                        <p className="font-bold text-lg text-primary">
                          {formatPrice(selectedOrder.total)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status & Tracking */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Status e Rastreio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Status do Pedido</Label>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(v) => handleUpdateStatus(v as Order["status"])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="processing">Processando</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="delivered">Entregue</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Código de Rastreio</Label>
                      <div className="flex gap-2">
                        <Input
                          value={selectedOrder.trackingCode || ""}
                          onChange={(e) =>
                            setSelectedOrder({ ...selectedOrder, trackingCode: e.target.value })
                          }
                          placeholder="BR123456789"
                        />
                        <Button
                          onClick={() =>
                            handleUpdateTracking(selectedOrder.trackingCode || "")
                          }
                        >
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
