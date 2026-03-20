import { useState } from "react";
import { Play, X } from "lucide-react";
import { useStoreData } from "@/contexts/StoreDataContext";

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1`;
  return null;
}

export function VideoFeedbackSection() {
  const { videoTestimonials, loadingVideos } = useStoreData();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  if (loadingVideos || videoTestimonials.length === 0) return null;

  return (
    <section className="py-12 bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Vídeos dos nossos clientes
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Veja o que dizem sobre seus pedidos
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {videoTestimonials.slice(0, 6).map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer bg-muted"
              onClick={() => {
                const embedUrl = getYoutubeEmbedUrl(video.videoUrl);
                setSelectedVideoUrl(embedUrl || video.videoUrl);
              }}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Play className="h-5 w-5 text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-white text-[10px]">
                <span className="font-medium truncate">{video.author}</span>
                <span className="bg-black/50 px-1.5 py-0.5 rounded">{video.duration}</span>
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
                <video src={selectedVideoUrl} className="w-full h-full rounded-xl" controls autoPlay />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
