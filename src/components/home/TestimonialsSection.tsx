import { testimonials } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-highlight border-highlight">
            RECEBIDOS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Chegou para nossos clientes
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="gradient-hero rounded-xl p-6 text-white"
            >
              <p className="text-sm md:text-base leading-relaxed">
                {testimonial.content}
              </p>
              <p className="mt-4 font-semibold text-sm opacity-90">
                {testimonial.handle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
