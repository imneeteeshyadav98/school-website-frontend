"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Video } from "@/types/video";

export default function HoverPreviewCard({
  video,
  onSelect,
}: {
  video: Video;
  onSelect: (video: Video) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const id = new URL(video.youtubeUrl).searchParams.get("v");
  const thumbnail = video.thumbnail?.url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const embed = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`;

  return (
    <div
      className="relative group w-full h-60 overflow-hidden rounded-lg shadow-lg bg-black transform transition-transform duration-300 hover:z-50 hover:scale-110"
      onMouseEnter={() => {
        timeoutRef.current = setTimeout(() => setShowPreview(true), 500);
      }}
      onMouseLeave={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowPreview(false);
      }}
    >
      {/* Thumbnail */}
      {!showPreview && (
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          unoptimized
          className="object-cover transition-opacity"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      )}

      {/* YouTube iframe */}
      {showPreview && (
        <iframe
          src={embed}
          title={video.title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

      {/* Metadata Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white text-xs space-y-1">
        <div className="font-semibold text-sm truncate">{video.title}</div>
        <div className="flex flex-wrap gap-1 text-[11px]">
          <span className="bg-white bg-opacity-10 px-1.5 py-0.5 rounded">🎓 {video.classLevel}</span>
          <span className="bg-white bg-opacity-10 px-1.5 py-0.5 rounded">{video.subject}</span>
          {video.tags?.map((tag) => (
            <span key={tag} className="bg-white bg-opacity-10 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onSelect(video)}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-1.5 rounded-full"
          title="Fullscreen"
        >
          ⛶
        </button>
        <button
          className="bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-1.5 rounded-full"
          title="Add to Watchlist"
        >
          ➕
        </button>
      </div>
    </div>
  );
}
