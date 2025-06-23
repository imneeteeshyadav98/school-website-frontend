'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
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
      <h3 className="text-xl font-semibold mb-4 px-2 text-gray-800">{title}</h3>

      <div className="max-w-6xl mx-auto">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          navigation
          modules={[Autoplay, Navigation]}
          className="overflow-visible"
        >
          {videos.map((video) => {
            const id = extractYouTubeId(video.youtubeUrl);
            if (!id) return null;

            const thumbnail = video.thumbnail?.url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            const isNew =
              video.publishedAt &&
              Date.now() - new Date(video.publishedAt).getTime() < 7 * 24 * 60 * 60 * 1000;

            const [hovered, setHovered] = useState(false);

            return (
              <SwiperSlide key={video.id} className="overflow-visible">
                <div className="relative group">
                  <div
                    onClick={() => onSelect(video)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transform transition duration-300 cursor-pointer hover:scale-110 z-10"
                  >
                    {/* Thumbnail or autoplay preview */}
                    <div className="relative w-full h-60 overflow-hidden bg-black">
                      {hovered ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                          title={video.title}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-opacity duration-300"
                        />
                      )}

                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-4xl bg-black bg-opacity-60 p-3 rounded-full">
                          ▶️
                        </span>
                      </div>

                      {/* NEW badge */}
                      {isNew && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold tracking-wide shadow-md z-30">
                          NEW
                        </div>
                      )}
                    </div>

                    {/* Info Panel */}
                    <div className="bg-gray-50 text-gray-800 px-3 py-2 space-y-1">
                      <p className="text-sm font-semibold truncate">{video.title}</p>
                      <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                        {video.classLevel && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            Class {video.classLevel}
                          </span>
                        )}
                        {video.subject && (
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {video.subject}
                          </span>
                        )}
                        {video.duration && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            ⏱ {video.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
