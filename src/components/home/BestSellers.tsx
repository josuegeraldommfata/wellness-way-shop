import { Link } from "react-router-dom";
import { useStoreData } from "@/contexts/StoreDataContext";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BestSellers() {
  const { products, loadingProducts } = useStoreData();
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  if (loadingProducts) {
    return (
      <section className="py-12 bg-muted/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Mais Vendidos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-3" />
                <div className="h-3 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) return null;

  return (
    <section className="py-12 bg-muted/50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Mais Vendidos
          </h2>
          <Button variant="ghost" size="sm" className="text-primary" asChild>
            <Link to="/loja">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
