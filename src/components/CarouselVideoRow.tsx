'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Video } from '@/types/video';

export default function CarouselVideoRow({
  title,
  videos,
  onSelect,
}: {
  title: string;
  videos: Video[];
  onSelect: (video: Video) => void;
}) {
  const [YTLoaded, setYTLoaded] = useState(false);

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = () => setYTLoaded(true);
    } else {
      setYTLoaded(true);
    }
  }, []);

  const extractYouTubeId = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
      return parsed.searchParams.get('v');
    } catch {
      return null;
    }
  };

  return (
    <section className="py-6 px-2">
      <h3 className="text-xl font-semibold mb-2 px-2 text-gray-800">{title}</h3>

      <div className="max-w-6xl mx-auto">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          autoplay={{ delay: 4000 }}
          centeredSlides
          centeredSlidesBounds
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          modules={[Autoplay, Navigation]}
          className="overflow-visible"
        >
          {videos.map((video) => {
            const id = extractYouTubeId(video.youtubeUrl);
            if (!id) return null;

            const thumbnail = video.thumbnail?.url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            const playerRef = useRef<HTMLIFrameElement | null>(null);

            const handleHover = () => {
              if (!YTLoaded || !playerRef.current) return;
              new (window as any).YT.Player(playerRef.current, {
                events: {
                  onReady: (event: any) => {
                    event.target.unMute();
                    event.target.playVideo();
                  },
                },
              });
            };

            return (
              <SwiperSlide key={video.id} className="overflow-visible">
                <div className="relative group">
                  <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow transition-all duration-300 ease-in-out transform group-hover:z-50 group-hover:scale-105 group-hover:shadow-lg">
                    <div
                      className="relative w-full h-60 overflow-hidden cursor-pointer"
                      onMouseEnter={handleHover}
                    >
                      {/* Thumbnail fallback */}
                      <img
                        src={thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover absolute inset-0 z-0 transition-opacity duration-300 group-hover:opacity-0"
                      />

                      {/* YouTube iframe preview */}
                      <iframe
                        ref={playerRef}
                        title={video.title}
                        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                        src={`https://www.youtube.com/embed/${id}?enablejsapi=1&controls=1&rel=0&modestbranding=1&autoplay=0`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />

                      {/* Overlay controls */}
                      <div className="absolute inset-0 flex justify-between items-start px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                          🔇 Muted Preview
                        </span>
                        <button
                          onClick={() => onSelect(video)}
                          className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full hover:bg-opacity-80 transition"
                          title="Open Fullscreen"
                        >
                          ⛶
                        </button>
                      </div>

                      {/* Play icon (centered) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <span className="text-white text-4xl bg-black bg-opacity-60 p-3 rounded-full">
                          ▶️
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-30">
                        <div className="h-full bg-indigo-500 animate-[progress_5s_linear_infinite]" />
                      </div>

                      {/* NEW badge */}
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold tracking-wide shadow-md z-30">
                        NEW
                      </div>
                    </div>

                    {/* Video Title */}
                    <div className="bg-gray-50 text-gray-800 px-3 py-2 text-sm truncate font-semibold">
                      {video.title}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
