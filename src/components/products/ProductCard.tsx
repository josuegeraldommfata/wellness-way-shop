import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/produto/${product.slug}`}
      className="group block bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded">
              Mais vendido
            </span>
          )}
        </div>
        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/90 shadow-md"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="space-y-0.5">
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            ou {product.installments}x de {formatPrice(product.installmentPrice)}
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          className="w-full rounded-full text-xs mt-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Comprar
        </Button>
      </div>
    </Link>
  );
}
