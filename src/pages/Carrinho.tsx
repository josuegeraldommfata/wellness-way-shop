import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, formatPrice } from "@/data/mockData";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

interface CartItem {
  productId: string;
  quantity: number;
}

const Carrinho = () => {
  // Mock cart items - would come from global state/context in real app
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 1 },
    { productId: "2", quantity: 2 },
  ]);

  const getProduct = (productId: string) =>
    products.find((p) => p.id === productId);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = getProduct(item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Carrinho de Compras
          </h1>
        </div>
      </div>

      <div className="container-custom py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">
              Adicione produtos para começar suas compras
            </p>
            <Button asChild>
              <Link to="/loja">Ir para a loja</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    {/* Product image */}
                    <Link
                      to={`/produto/${product.slug}`}
                      className="w-24 h-24 bg-muted rounded-lg shrink-0 overflow-hidden"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </Link>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/produto/${product.slug}`}
                        className="font-semibold hover:text-primary transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-highlight font-bold mt-1">
                        {formatPrice(product.price)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.productId, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.productId, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Subtotal and remove */}
                    <div className="text-right">
                      <p className="font-bold">
                        {formatPrice(product.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive mt-2"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-32">
                <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-accent font-medium">A calcular</span>
                  </div>
                </div>

                <div className="border-t border-border my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-highlight">{formatPrice(subtotal)}</span>
                </div>

                {/* Coupon */}
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Cupom de desconto</p>
                  <div className="flex gap-2">
                    <Input placeholder="Digite seu cupom" className="flex-1" />
                    <Button variant="outline">Aplicar</Button>
                  </div>
                </div>

                <Button variant="highlight" size="lg" className="w-full mt-6">
                  Finalizar Compra
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  * Este é apenas um protótipo de UI. O checkout real será implementado com integração de pagamento.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Carrinho;
