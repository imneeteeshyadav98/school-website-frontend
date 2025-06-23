'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

import { Video } from '@/types/video';
import VideoModal from './VideoModal';

interface Props {
  videos: Video[];
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

export default function CarouselVideoSection({ videos }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenModal = (video: Video) => {
    setActiveVideo(video);
  };

  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-4 px-2 flex items-center gap-2">
        <span>🔥</span> <span>Top Educational Videos</span>
      </h2>

      {videos.length === 0 ? (
        <p className="text-center text-red-500">⚠️ No videos available.</p>
      ) : (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4.5 },
          }}
          navigation
          modules={[Autoplay, Navigation]}
          className="overflow-visible" // allow pop-out
        >
          {videos.map((video) => {
            const id = extractYouTubeId(video.youtubeUrl);
            if (!id) return null;

            const fallbackThumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            const finalThumbnail = video.thumbnail?.url || fallbackThumbnail;

            return (
              <SwiperSlide key={video.id} className="overflow-visible">
                <div className="relative group">
                  <div className="relative rounded-lg overflow-hidden bg-white shadow transition-all duration-300 ease-in-out transform group-hover:z-50 group-hover:scale-110 group-hover:shadow-2xl">
                    <div
                      className="relative w-full h-60 overflow-hidden cursor-pointer"
                      onClick={() => handleOpenModal(video)}
                    >
                      <img
                        src={finalThumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="text-white text-4xl bg-black bg-opacity-70 p-3 rounded-full">▶️</button>
                      </div>
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold tracking-wide shadow-md">
                        NEW
                      </div>
                    </div>

                    <div className="bg-gray-100 text-gray-800 px-3 py-2 text-sm transition-all">
                      <div className="font-semibold truncate">{video.title}</div>
                      <div className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden text-xs text-gray-600 transition-all duration-300 ease-in-out">
                        {/* {video.description?.slice(0, 100) || 'No description available.'} */}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {activeVideo && (
        <VideoModal
          youtubeUrl={activeVideo.youtubeUrl}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
