'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [soundEnabledMap, setSoundEnabledMap] = useState<Record<string, boolean>>({});
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFullscreen = (id: string) => {
    const element = document.getElementById(`video-${id}`);
    if (element?.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  const handleSoundToggle = (id: string) => {
    setSoundEnabledMap((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])),
      [id]: !prev[id],
    }));
  };

  const handleOpenModal = (video: Video) => {
    setActiveVideo(video);
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">🔥 Top Educational Videos</h2>

      {videos.length === 0 ? (
        <p className="text-center text-red-500">⚠️ No videos available.</p>
      ) : (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          modules={[Autoplay, Navigation]}
        >
          {videos.map((video) => {
            const id = extractYouTubeId(video.youtubeUrl);
            if (!id) return null;

            const fallbackThumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            const finalThumbnail = video.thumbnail?.url || fallbackThumbnail;
            const isHovered = hoveredVideoId === id;
            const isExpanded = expandedVideoId === id;
            const isSoundOn = soundEnabledMap[id] ?? false;

            return (
              <SwiperSlide key={video.id}>
                <div
                  className="cursor-pointer group rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 relative"
                  onMouseEnter={() => setHoveredVideoId(id)}
                  onMouseLeave={() => {
                    setHoveredVideoId(null);
                    setExpandedVideoId(null);
                  }}
                >
                  <div
                    id={`video-${id}`}
                    className={`relative w-full ${isExpanded ? 'h-72' : 'h-48'} transition-all duration-500 overflow-hidden bg-black`}
                  >
                    <img
                      src={finalThumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=${isSoundOn ? '0' : '1'}&controls=0&loop=1&playlist=${id}&modestbranding=1`}
                        title={video.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>

                    {/* Controls */}
                    {isHovered && (
                      <div className="absolute bottom-2 right-2 z-10 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSoundToggle(id);
                          }}
                          title={isSoundOn ? 'Mute' : 'Unmute'}
                          className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded hover:bg-opacity-80"
                        >
                          {isSoundOn ? '🔊' : '🔇'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedVideoId(isExpanded ? null : id);
                          }}
                          className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded hover:bg-opacity-80"
                        >
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFullscreen(id);
                          }}
                          title="Fullscreen"
                          className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded hover:bg-opacity-80"
                        >
                          ⛶
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="bg-gray-900 text-white text-sm font-medium px-3 py-2 truncate"
                    onClick={() => handleOpenModal(video)}
                  >
                    {video.title}
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