import { useStoreData } from "@/contexts/StoreDataContext";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";

export function BestSellers() {
  const { products, loadingProducts } = useStoreData();
  const bestSellers = products.filter((p) => p.isBestSeller);

  if (loadingProducts) {
    return (
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              MAIS VENDIDOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Produtos mais vendidos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-xl aspect-square mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            MAIS VENDIDOS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Produtos mais vendidos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
