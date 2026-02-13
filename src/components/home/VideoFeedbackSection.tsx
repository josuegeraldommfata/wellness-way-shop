import { useState } from "react";
import { Play, X } from "lucide-react";
import { useStoreData } from "@/contexts/StoreDataContext";
import { Badge } from "@/components/ui/badge";

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  // Handle youtube.com/watch?v=ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
  // Handle youtube.com/shorts/ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1`;
  return null;
}

export function VideoFeedbackSection() {
  const { videoTestimonials, loadingVideos } = useStoreData();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  if (loadingVideos) {
    return (
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
              VIDEOS DE CLIENTES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Feedback dos nossos clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse aspect-[9/16] bg-white/10 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (videoTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-primary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
            VIDEOS DE CLIENTES
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Feedback dos nossos clientes
          </h2>
          <p className="text-primary-foreground/80 mt-2">
            Veja o que nossos clientes dizem sobre seus pedidos
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer bg-black/20"
              onClick={() => {
                const embedUrl = getYoutubeEmbedUrl(video.videoUrl);
                setSelectedVideoUrl(embedUrl || video.videoUrl);
              }}
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
                  <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
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

        {/* Video modal */}
        {selectedVideoUrl && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedVideoUrl(null)}
          >
            <div className="relative max-w-2xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="absolute -top-10 right-0 text-white hover:text-white/80"
              >
                <X className="h-8 w-8" />
              </button>
              {selectedVideoUrl.includes("youtube.com/embed") ? (
                <iframe
                  src={selectedVideoUrl}
                  className="w-full h-full rounded-xl"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideoUrl}
                  className="w-full h-full rounded-xl"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
