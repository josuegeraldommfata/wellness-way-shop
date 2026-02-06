import { Link } from "react-router-dom";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreData } from "@/contexts/StoreDataContext";
import { useState, useEffect } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

export function HeroSection() {
  const { banners } = useStoreData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeBanners = banners
    .filter((b) => b.isActive)
    .sort((a, b) => a.order - b.order);

  // Use default if no banners
  const slides =
    activeBanners.length > 0
      ? activeBanners
      : [
          {
            id: "default",
            title: "EMAGREÇA COM QUALIDADE E SEGURANÇA",
            subtitle: "Produtos importados, originais e com entrega rápida para transformar sua rotina.",
            buttonText: "COMPRAR AGORA",
            buttonLink: "/loja",
            image: "",
            isActive: true,
            order: 1,
          },
        ];

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const currentBanner = slides[currentSlide];

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Background gradient - Azul */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={currentBanner.image || heroBanner}
          alt={currentBanner.title}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-custom h-full flex items-center py-16 md:py-24">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {currentBanner.title.split(" ").slice(0, 3).join(" ")}
            <br />
            <span className="text-white/90">
              {currentBanner.title.split(" ").slice(3).join(" ")}
            </span>
          </h1>
          {currentBanner.subtitle && (
            <p className="mt-6 text-lg md:text-xl opacity-90 leading-relaxed">
              {currentBanner.subtitle}
            </p>
          )}
          {currentBanner.buttonText && currentBanner.buttonLink && (
            <Button
              variant="success"
              size="xl"
              className="mt-8 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link to={currentBanner.buttonLink}>
                <ShoppingCart className="h-5 w-5" />
                {currentBanner.buttonText}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white h-12 w-12 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white h-12 w-12 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
