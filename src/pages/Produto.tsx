import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/data/mockData";
import { useStoreData } from "@/contexts/StoreDataContext";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/products/ProductCard";
import { ShoppingCart, Heart, Minus, Plus, ChevronLeft, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Produto = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { products, loadingProducts } = useStoreData();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug);

  if (loadingProducts) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando produto...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold">Produto nao encontrado</h1>
          <Button asChild className="mt-4">
            <Link to="/loja">Voltar a loja</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const validImages = product.images.filter((img) => img && img !== "/placeholder.svg");

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
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
          <div>
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
              <img
                src={validImages[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            {/* Thumbnails */}
            {validImages.length > 1 && (
              <div className="flex gap-3 mt-4">
                {validImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {product.isBestSeller && (
              <Badge className="w-fit mb-4 bg-accent text-accent-foreground">
                Mais Vendido
              </Badge>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            <p className="text-muted-foreground mt-2">{product.brand}</p>

            {/* Price */}
            <div className="mt-6 p-6 bg-secondary rounded-xl">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              <p className="text-accent mt-2 font-medium">
                Em ate {product.installments}x de {formatPrice(product.installmentPrice)} com juros
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
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success(`${product.name} adicionado ao carrinho!`);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-accent" />
                <span>Entrega rapida para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>Produto original e lacrado</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-5 w-5 text-accent" />
                <span>Pagamento seguro em ate 12x</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Descricao</h2>
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
            {products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Produto;
