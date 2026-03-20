import { Link } from "react-router-dom";
import { useStoreData } from "@/contexts/StoreDataContext";

export function CategoriesSection() {
  const { categories, loadingProducts } = useStoreData();

  if (loadingProducts) {
    return (
      <section className="py-10 bg-background">
        <div className="container-custom">
          <div className="flex gap-8 justify-center flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-muted" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-10 bg-background">
      <div className="container-custom">
        <div className="flex gap-6 md:gap-10 justify-center flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/loja?categoria=${category.slug}`}
              className="group flex flex-col items-center gap-3 min-w-[90px]"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-border bg-secondary overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:scale-105">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground text-center leading-tight group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
          <Link
            to="/loja"
            className="group flex flex-col items-center gap-3 min-w-[90px]"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-muted-foreground/40 bg-muted flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-secondary">
              <span className="text-2xl text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground text-center group-hover:text-primary transition-colors">
              Ver todos
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
