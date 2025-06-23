"use client";

import { useEffect, useState } from "react";
import { fetchVideoLectures } from "@/lib/strapi";
import { Video } from "@/types/video";
import CarouselVideoRow from "@/components/CarouselVideoRow";
import VideoPlaylistModal from "@/components/VideoPlaylistModal";

export default function LecturePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch videos
  useEffect(() => {
    const load = async () => {
      const all = await fetchVideoLectures();
      setVideos(all);
      setLoading(false);
    };
    load();
  }, []);

  // Filter by search
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  // Group by classLevel and subject
  const grouped: Record<string, Record<string, Video[]>> = {};
  for (const video of filtered) {
    const cls = video.classLevel || "Unknown";
    const subj = video.subject || "General";
    grouped[cls] ||= {};
    grouped[cls][subj] ||= [];
    grouped[cls][subj].push(video);
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-4">🎬 Educational Lectures</h1>

      {/* 🔍 Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search lectures..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
        />
      </div>

      {/* 🎓 Grouped video carousels */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        Object.entries(grouped).flatMap(([classLevel, subjects]) =>
          Object.entries(subjects).map(([subject, vids]) => (
            <CarouselVideoRow
              key={`${classLevel}-${subject}`}
              title={`🎓 Class ${classLevel} - ${subject}`}
              videos={vids}
              onSelect={(video) => setSelected(video)}
            />
          ))
        )
      )}

      {/* 🎥 Modal viewer */}
      {selected && (
        <VideoPlaylistModal
          initialVideo={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
