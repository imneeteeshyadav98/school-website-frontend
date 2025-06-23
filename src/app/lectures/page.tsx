"use client";

import { useEffect, useState } from "react";
import { fetchVideoLectures } from "@/lib/strapi";
import VideoLectureGrid from "@/components/VideoLectureGrid";
import { Video } from "@/types/video";
import SkeletonGrid from "@/components/SkeletonGrid";

export default function LecturePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const all = await fetchVideoLectures();
      setVideos(all);
      setLoading(false);
    };
    load();
  }, []);

  // Filtering logic
  const filtered = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by class → subject
  const groupedVideos: Record<string, Record<string, Video[]>> = {};
  for (const video of filtered) {
    const classKey = video.classLevel || "Unknown Class";
    const subjectKey = video.subject || "Unknown Subject";
    if (!groupedVideos[classKey]) groupedVideos[classKey] = {};
    if (!groupedVideos[classKey][subjectKey]) groupedVideos[classKey][subjectKey] = [];
    groupedVideos[classKey][subjectKey].push(video);
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center">🎓 Class & Subject-wise Video Lectures</h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title..."
          className="px-4 py-2 border rounded-md w-full max-w-md"
        />
      </div>

      {/* 📺 Lecture Grid */}
      {loading ? (
        <SkeletonGrid />
      ) : Object.keys(groupedVideos).length === 0 ? (
        <p className="text-center text-gray-500">No videos found.</p>
      ) : (
        <VideoLectureGrid groupedVideos={groupedVideos} />
      )}
    </main>
  );
}
