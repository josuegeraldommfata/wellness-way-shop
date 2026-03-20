import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreData } from "@/contexts/StoreDataContext";
import { useState, useEffect } from "react";

export function HeroSection() {
  const { banners, loadingBanners } = useStoreData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeBanners = banners
    .filter((b) => b.isActive)
    .sort((a, b) => a.order - b.order);

  const slides =
    activeBanners.length > 0
      ? activeBanners
      : [
          {
            id: "default",
            title: "Sua saúde merece o melhor",
            subtitle: "Produtos importados com qualidade garantida e entrega rápida para todo o Brasil.",
            buttonText: "VER OFERTAS",
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

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const currentBanner = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-secondary">
      <div className="relative h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px]">
        {/* Background image or gradient */}
        {currentBanner.image ? (
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        )}

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative h-full container-custom flex items-center">
          <div className="max-w-lg text-white space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
              {currentBanner.title}
            </h2>
            {currentBanner.subtitle && (
              <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed max-w-md">
                {currentBanner.subtitle}
              </p>
            )}
            {currentBanner.buttonText && currentBanner.buttonLink && (
              <Button
                size="lg"
                className="bg-white text-foreground font-bold hover:bg-white/90 shadow-lg rounded-full px-8"
                asChild
              >
                <Link to={currentBanner.buttonLink}>
                  {currentBanner.buttonText}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
