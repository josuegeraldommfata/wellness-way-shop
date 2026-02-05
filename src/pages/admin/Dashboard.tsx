import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStoreData } from "@/contexts/StoreDataContext";
import { formatPrice } from "@/data/mockData";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { products, orders, categories } = useStoreData();

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const processingOrders = orders.filter((o) => o.status === "processing").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const stats = [
    {
      title: "Produtos",
      value: products.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pedidos",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Categorias",
      value: categories.length,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Faturamento",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const orderStats = [
    { label: "Pendentes", value: pendingOrders, icon: Clock, color: "text-yellow-600" },
    { label: "Processando", value: processingOrders, icon: Package, color: "text-blue-600" },
    { label: "Enviados", value: shippedOrders, icon: Truck, color: "text-purple-600" },
    { label: "Entregues", value: deliveredOrders, icon: CheckCircle, color: "text-green-600" },
  ];

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da sua loja</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {orderStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {order.customerName} {order.customerLastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.map((i) => i.productName).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatPrice(order.total)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.status === "shipped"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status === "pending" && "Pendente"}
                      {order.status === "processing" && "Processando"}
                      {order.status === "shipped" && "Enviado"}
                      {order.status === "delivered" && "Entregue"}
                      {order.status === "cancelled" && "Cancelado"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
