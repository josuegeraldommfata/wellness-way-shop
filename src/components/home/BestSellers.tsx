import { products } from "@/data/mockData";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";

export function BestSellers() {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-highlight border-highlight">
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
