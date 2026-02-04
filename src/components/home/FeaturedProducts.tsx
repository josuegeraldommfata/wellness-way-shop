import { products } from "@/data/mockData";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Produtos em destaque
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
