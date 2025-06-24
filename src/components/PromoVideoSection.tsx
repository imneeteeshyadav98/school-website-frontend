'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
  const [isHovered, setIsHovered] = useState(false);

  if (!videoUrl?.startsWith('http')) return null;

  const isYouTube =
    videoType === 'youtube' ||
    (!videoType && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')));

  const videoID = videoUrl.includes('watch?v=')
    ? videoUrl.split('watch?v=')[1]
    : videoUrl.split('/').pop() || '';

  const embedURL = `https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoID}&modestbranding=1`;

  const thumbSrc = isYouTube
    ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
    : videoThumb || '/default-thumb.jpg';

  return (
    <section id="campus-tour" className="py-12 px-4 sm:px-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">🎬 Campus Tour</h3>

      <div className="flex justify-center">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-[1.04]"
          aria-label="Watch Campus Tour"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Hover video preview */}
          {isYouTube && isHovered ? (
            <iframe
              src={embedURL}
              title="Campus Tour Preview"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full">
              <Image
                src={thumbSrc}
                alt="Campus Tour"
                fill
                unoptimized
                className="object-cover transition duration-300 ease-in-out group-hover:blur-sm group-hover:scale-105"
              />
            </div>
          )}

          {/* Play icon overlay */}
          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition z-10">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 84 84">
                <circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.6)" />
                <polygon points="33,25 60,42 33,59" fill="white" />
              </svg>
            </div>
          )}
        </a>
      </div>

      {videoTitle && (
        <p className="text-center text-gray-600 mt-4 text-base italic">{videoTitle}</p>
      )}
    </section>
  );
}
