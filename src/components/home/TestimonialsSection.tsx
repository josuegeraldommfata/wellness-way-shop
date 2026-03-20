import { testimonials } from "@/data/mockData";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            O que nossos clientes dizem
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Avaliações reais dos nossos compradores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.slice(0, 4).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-lg p-5 space-y-3"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="pt-2 border-t border-border">
                <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
