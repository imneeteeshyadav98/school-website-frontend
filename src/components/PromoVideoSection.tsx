'use client';

import React, { useState } from 'react';

type PromoVideoSectionProps = {
  videoUrl: string;
  videoTitle?: string;
  videoThumb?: string;
  videoType?: 'youtube' | 'file';
};

export default function PromoVideoSection({
  videoUrl,
  videoTitle,
  videoThumb,
  videoType,
}: PromoVideoSectionProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  if (!videoUrl?.startsWith('http')) return null;

  const isYouTube =
    videoType === 'youtube' ||
    (!videoType && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')));

  const videoID = videoUrl.includes('watch?v=')
    ? videoUrl.split('watch?v=')[1]
    : videoUrl.split('/').pop() || '';

  const embedURL = `https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&mute=1&loop=1&controls=1&playlist=${videoID}`;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section
      id="campus-tour"
      className="relative text-center bg-gray-50 py-12 px-4 sm:px-6 rounded-lg shadow-inner"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Campus Tour</h3>

      <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg group">
        {/* Overlay Play Button */}
        <button
          onClick={openModal}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 text-white group-hover:bg-black/60 transition"
          aria-label="Play Video"
        >
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.6)" />
            <polygon points="33,25 60,42 33,59" fill="white" />
          </svg>
        </button>

        {/* Thumbnail */}
        <img
          src={
            isYouTube
              ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
              : videoThumb || '/default-thumb.jpg'
          }
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {videoTitle && <p className="text-sm text-gray-600 mt-4">{videoTitle}</p>}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/80 p-2 rounded"
              aria-label="Close"
            >
              ✕
            </button>

            {isYouTube ? (
              <iframe
                src={embedURL}
                title="Campus Tour"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full"
                poster={videoThumb || undefined}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
