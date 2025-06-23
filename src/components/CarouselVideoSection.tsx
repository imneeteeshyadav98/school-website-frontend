'use client';

import { useState } from 'react';
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
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const handleOpenModal = (video: Video) => setActiveVideo(video);

  const renderVideoCard = (video: Video) => {
    const id = extractYouTubeId(video.youtubeUrl);
    if (!id) return null;

    const thumbnail = video.thumbnail?.url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    const isNew =
      video.publishedAt &&
      Date.now() - new Date(video.publishedAt).getTime() < 7 * 24 * 60 * 60 * 1000;

    return (
      <div
        key={video.id}
        className="w-full max-w-[260px] relative group cursor-pointer"
        onClick={() => handleOpenModal(video)}
      >
        <div className="rounded-lg overflow-hidden bg-white shadow transition-all duration-300 ease-in-out transform group-hover:z-50 group-hover:scale-110 group-hover:shadow-2xl">
          {/* Thumbnail */}
          <div className="relative w-full h-60 overflow-hidden">
            <img
              src={thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span className="text-white text-4xl bg-black bg-opacity-60 p-3 rounded-full">▶️</span>
            </div>
            {/* NEW badge */}
            {isNew && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold tracking-wide shadow-md z-30">
                NEW
              </div>
            )}
          </div>

          {/* Title and Tags */}
          <div className="bg-gray-100 text-gray-800 px-3 py-2 text-sm">
            <div className="font-semibold truncate">{video.title}</div>
            <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-600">
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
    );
  };

  return (
    <section className="py-10 px-4 max-w-screen-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <span>🔥</span> <span>Top Educational Videos</span>
      </h2>

      {videos.length === 0 ? (
        <p className="text-center text-red-500">⚠️ No videos available.</p>
      ) : videos.length < 5 ? (
        <div className="flex justify-center gap-6 flex-wrap">
          {videos.map(renderVideoCard)}
        </div>
      ) : (
        <Swiper
          slidesPerView={5}
          spaceBetween={16}
          autoplay={{ delay: 4000 }}
          navigation
          modules={[Autoplay, Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="overflow-visible"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>{renderVideoCard(video)}</SwiperSlide>
          ))}
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
