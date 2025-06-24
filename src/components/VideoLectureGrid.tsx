"use client";

import { Video } from "@/types/video";
import VideoCard from "./VideoCard";

export default function VideoLectureGrid({ groupedVideos }: { groupedVideos: Record<string, Record<string, Video[]>> }) {
  return (
    <div className="space-y-6">
      {Object.entries(groupedVideos).map(([classLevel, subjects]) => (
        <details key={classLevel} open className="border rounded-md p-2">
          <summary className="text-lg font-semibold text-indigo-800 cursor-pointer">
            🏫 Class {classLevel}
          </summary>

          <div className="pl-4 mt-2 space-y-4">
            {Object.entries(subjects).map(([subject, videos]) => (
              <details key={subject} open className="bg-gray-50 rounded-md p-2">
                <summary className="font-medium text-gray-800">
                  📘 {subject}
                </summary>

                <div className="mt-2 flex gap-4 flex-wrap">
                  {videos.map((video) => (
                    <div key={video.id} className="w-full sm:w-[280px]">
                      <VideoCard video={video} />
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
