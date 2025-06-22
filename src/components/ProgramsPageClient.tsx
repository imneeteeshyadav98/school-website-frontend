"use client";

import { useEffect, useState } from "react";
import ProgramSection from "./ProgramSection";
import ProgramCardSkeleton from "./ProgramCardSkeleton";

type Program = {
  title: string;
  description: string;
  icon?: string;
  slug: string;
  highlightColor: string;
  available: boolean;
  stream?: string;
};

export default function ProgramsPageClient({ programs }: { programs: Program[] }) {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const filteredPrograms = programs.filter((p) =>
    filter === "All" ? true : p.stream === filter
  );

  const uniqueStreams = Array.from(
    new Set(programs.map((p) => p.stream ?? "General"))
  );

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-12">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            filter === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>

        {uniqueStreams.map((stream) => (
          <button
            key={stream}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filter === stream
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(stream)}
          >
            {stream}
          </button>
        ))}
      </div>

      {/* 🔰 Stream Badge Grid Preview (Optional Visual Display) */}
      <div className="flex flex-wrap justify-center gap-2">
        {uniqueStreams.map((stream) => (
          <span
            key={stream}
            className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300"
          >
            {stream}
          </span>
        ))}
      </div>

      {/* Grid or Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProgramCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ProgramSection programs={filteredPrograms} />
      )}
    </div>
  );
}
