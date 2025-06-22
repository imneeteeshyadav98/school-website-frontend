"use client";

import { useState } from "react";
import { Video } from "@/types/video";
import VideoModal from "./VideoModal";

export default function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay?: () => void;
}) {
  const {
    title,
    youtubeUrl,
    subject,
    topic,
    thumbnail,
    classLevel,
    publishedAt,
    duration,
  } = video;

  const [isOpen, setIsOpen] = useState(false);

  const embedUrl =
    youtubeUrl && youtubeUrl.includes("watch?v=")
      ? youtubeUrl.replace("watch?v=", "embed/")
      : youtubeUrl || null;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200 bg-white border border-gray-200 hover:border-indigo-400">
        {/* Thumbnail or fallback */}
        {thumbnail?.url ? (
          <img
            src={thumbnail.url}
            alt={title}
            loading="lazy"
            className="w-full h-auto object-cover aspect-video cursor-pointer group-hover:scale-105 transition-transform"
            onClick={handlePlay}
          />
        ) : embedUrl ? (
          <div
            onClick={handlePlay}
            className="aspect-video w-full bg-black flex items-center justify-center text-white text-sm cursor-pointer"
          >
            ▶️ Watch Video
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-sm text-gray-500">
            🎞️ Video unavailable
          </div>
        )}

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              🎓 {classLevel}
            </span>
            {subject && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                📚 {subject}
              </span>
            )}
            {duration && (
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                ⏱️ {duration}
              </span>
            )}
          </div>

          <h3 className="font-semibold text-base text-gray-900 line-clamp-2 sm:text-md">
            {title}
          </h3>

          {topic && (
            <p className="text-sm text-gray-700 line-clamp-1">
              📘 <span className="font-medium">Topic:</span> {topic}
            </p>
          )}

          {formattedDate && (
            <p className="text-xs text-gray-400">📅 {formattedDate}</p>
          )}

          {youtubeUrl && (
            <button
              onClick={handlePlay}
              className="w-full mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
            >
              ▶️ Watch Video
            </button>
          )}
        </div>
      </div>

      {/* Fallback modal if onPlay is not used */}
      {isOpen && embedUrl && (
        <VideoModal
          embedUrl={embedUrl}
          title={title}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
