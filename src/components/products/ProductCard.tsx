import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Image container */}
      <Link to={`/produto/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-highlight text-highlight-foreground text-xs font-semibold rounded-md">
            Mais Vendido
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 text-center">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-3">
          <p className="text-xl font-bold text-highlight">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-accent mt-1">
            Em até {product.installments}x com juros
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="wishlist" size="sm" className="w-full">
            <Heart className="h-3.5 w-3.5" />
            ADD TO WISHLIST
          </Button>
          <Button variant="cart" size="sm" className="w-full">
            <ShoppingCart className="h-3.5 w-3.5" />
            ADICIONAR AO CARRINHO
          </Button>
          <Button variant="quickview" size="sm" className="w-full" asChild>
            <Link to={`/produto/${product.slug}`}>
              <Eye className="h-3.5 w-3.5" />
              QUICK VIEW
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
