"use client";

import { Video } from "@/types/video";

export default function VideoCard({ video }: { video: Video }) {
  const {
    title,
    youtubeUrl,
    subject,
    topic,
    classLevel,
    publishedAt,
    duration,
  } = video;

  const getYoutubeId = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
      if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v");
      return null;
    } catch {
      return null;
    }
  };

  const videoId = getYoutubeId(youtubeUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "/fallback-thumb.jpg";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Logic for badges
  const isNew = publishedAt
    ? Date.now() - new Date(publishedAt).getTime() < 7 * 24 * 60 * 60 * 1000
    : false;
  const isPopular = duration && parseInt(duration) >= 20;

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition border border-gray-200 bg-white">
      {/* Thumbnail */}
      <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="w-full aspect-video object-cover"
          />

          {/* Badges over thumbnail */}
          <div className="absolute top-2 left-2 flex gap-2">
            {isNew && (
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                🆕 New
              </span>
            )}
            {isPopular && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                🔥 Popular
              </span>
            )}
          </div>
        </div>
      </a>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex flex-wrap gap-2 text-xs">
          {classLevel && (
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              🎓 {classLevel}
            </span>
          )}
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

        <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">
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

        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-2 text-sm text-white text-center bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
        >
          ▶️ Watch on YouTube
        </a>
      </div>
    </div>
  );
}
