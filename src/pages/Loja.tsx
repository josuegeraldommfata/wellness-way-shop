import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { products, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";

const Loja = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get("categoria") || "";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    if (categorySlug === selectedCategory) {
      searchParams.delete("categoria");
    } else {
      searchParams.set("categoria", categorySlug);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Nossa Loja
          </h1>
          <p className="text-muted-foreground mt-2">
            Encontre os melhores produtos para sua saúde
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <h2 className="text-lg font-semibold mb-4">Categorias</h2>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === "" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange("")}
                >
                  Todos os produtos
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryChange(category.slug)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Search and filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Categorias</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => handleCategoryChange("")}
                  >
                    Todos
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.slug ? "default" : "secondary"}
                      size="sm"
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Results count */}
            <p className="text-muted-foreground mb-6">
              Mostrando {filteredProducts.length} produto(s)
            </p>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Nenhum produto encontrado para sua busca.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Loja;
