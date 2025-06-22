"use client";

import { useState } from "react";
import { Video } from "@/types/video";
import VideoCard from "./VideoCard";
import VideoPlaylistModal from "./VideoPlaylistModal";

export default function VideoLectureGrid({ videos }: { videos: Video[] }) {
  const [classFilter, setClassFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const classOptions = Array.from(
    new Set(videos.map((v) => v.classLevel ?? "Unknown"))
  );
  const subjectOptions = Array.from(
    new Set(videos.map((v) => v.subject))
  );

  const filtered = videos.filter(
    (v) =>
      (classFilter === "All" || v.classLevel === classFilter) &&
      (subjectFilter === "All" || v.subject === subjectFilter)
  );

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        <select
          className="px-4 py-2 border rounded-md text-sm"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="All">All Classes</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-md text-sm"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="All">All Subjects</option>
          {subjectOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((video, idx) => (
          <VideoCard
            key={idx}
            video={video}
            onPlay={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* Playlist Modal */}
      {selectedVideo && (
        <VideoPlaylistModal
          videos={filtered}
          initialVideo={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
