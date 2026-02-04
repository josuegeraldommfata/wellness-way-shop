import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, formatPrice } from "@/data/mockData";
import { ProductCard } from "@/components/products/ProductCard";
import { ShoppingCart, Heart, Minus, Plus, ChevronLeft, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";

const Produto = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);
  const relatedProducts = products.filter((p) => p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          <Button asChild className="mt-4">
            <Link to="/loja">Voltar à loja</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container-custom">
          <Link
            to="/loja"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para a loja
          </Link>
        </div>
      </div>

      {/* Product details */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product image */}
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {product.isBestSeller && (
              <Badge className="w-fit mb-4 bg-highlight text-highlight-foreground">
                Mais Vendido
              </Badge>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            <p className="text-muted-foreground mt-2">{product.brand}</p>

            {/* Price */}
            <div className="mt-6 p-6 bg-muted rounded-xl">
              <p className="text-3xl font-bold text-highlight">
                {formatPrice(product.price)}
              </p>
              <p className="text-accent mt-2 font-medium">
                Em até {product.installments}x de {formatPrice(product.installmentPrice)} com juros
              </p>
            </div>

            {/* Quantity selector */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Quantidade</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button variant="highlight" size="lg" className="flex-1">
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline-highlight" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-accent" />
                <span>Entrega rápida para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>Produto original e lacrado</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-5 w-5 text-accent" />
                <span>Pagamento seguro em até 12x</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Produtos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Produto;
