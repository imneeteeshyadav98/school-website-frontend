'use client';

import { useEffect, useState } from 'react';
import { fetchVideoLectures } from '@/lib/strapi';
import VideoLectureGrid from '@/components/VideoLectureGrid';
import { Video } from '@/types/video';
import SkeletonGrid from '@/components/SkeletonGrid'; // or ProgramCardSkeleton

export default function LecturePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // UI filter states
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch videos on load
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const all = await fetchVideoLectures();
      setVideos(all);
      setLoading(false);
    };
    load();
  }, []);

  // Apply filtering whenever filters or searchQuery changes
  useEffect(() => {
    const filtered = videos.filter((video) => {
      const matchClass = selectedClass ? video.classLevel === selectedClass : true;
      const matchSubject = selectedSubject ? video.subject === selectedSubject : true;
      const matchSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSubject && matchSearch;
    });
    setFilteredVideos(filtered);
  }, [videos, selectedClass, selectedSubject, searchQuery]);

  // Extract dropdown options dynamically
  const classOptions = [...new Set(videos.map((v) => v.classLevel))];
  const subjectOptions = [...new Set(videos.map((v) => v.subject))];

  return (
    <main className="max-w-6xl mx-auto py-16 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Class-wise Video Lectures</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Classes</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Subjects</option>
          {subjectOptions.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />
      </div>

      {/* Grid or Loader */}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <VideoLectureGrid videos={filteredVideos} />
      )}
    </main>
  );
}
