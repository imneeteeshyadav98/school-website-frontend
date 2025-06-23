// src/components/VideoRow.tsx
"use client";

import { useRef } from "react";
import { Video } from "@/types/video";
import VideoCard from "./VideoCard";

export default function VideoRow({
  title,
  videos,
  onSelect,
}: {
  title: string;
  videos: Video[];
  onSelect: (video: Video) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-2 px-2">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 left-0 h-full w-10 bg-black bg-opacity-60 hover:bg-opacity-90 text-white text-xl"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-12 py-2"
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="min-w-[260px] max-w-[260px] cursor-pointer"
              onClick={() => onSelect(video)}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute z-10 right-0 h-full w-10 bg-black bg-opacity-60 hover:bg-opacity-90 text-white text-xl"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
