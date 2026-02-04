import { useState } from "react";
import { Play } from "lucide-react";
import { videoTestimonials } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export function VideoFeedbackSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-16 bg-highlight">
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
            VÍDEOS DE CLIENTES
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Feedback dos nossos clientes
          </h2>
          <p className="text-white/80 mt-2">
            Veja o que nossos clientes estão dizendo sobre seus pedidos
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer bg-black/20"
              onClick={() => setSelectedVideo(video.id)}
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-highlight ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-sm">
                <span className="font-medium">{video.author}</span>
                <span className="bg-black/50 px-2 py-1 rounded text-xs">
                  {video.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Video modal placeholder - would be a real video player */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="bg-background rounded-xl p-6 max-w-lg w-full text-center">
              <h3 className="text-lg font-semibold mb-4">Vídeo em breve!</h3>
              <p className="text-muted-foreground mb-4">
                Esta é uma área preparada para você adicionar seus vídeos de clientes reais.
                Clique para fechar.
              </p>
              <p className="text-sm text-primary">
                Dica: Substitua as URLs no arquivo mockData.ts pelos links dos seus vídeos.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
