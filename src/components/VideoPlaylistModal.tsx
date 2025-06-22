"use client";

import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useDrag } from "@use-gesture/react";

export default function VideoPlaylistModal({
  videos,
  initialVideo,
  onClose,
}: {
  videos: Video[];
  initialVideo: Video;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState<Video>(initialVideo);
  const [showPlaylist, setShowPlaylist] = useState(true);

  const x = useMotionValue(0);

  // Use gesture only on a plain div inside the motion wrapper
  const bind = useDrag(
    ({ down, movement: [mx], cancel }) => {
      if (mx > 100 && !showPlaylist) {
        setShowPlaylist(true);
        cancel?.();
      } else if (mx < -100 && showPlaylist) {
        setShowPlaylist(false);
        cancel?.();
      } else {
        x.set(down ? mx : 0);
      }
    },
    { axis: "x", filterTaps: true }
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    if (window.innerWidth < 640) setShowPlaylist(false);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const getEmbedUrl = (youtubeUrl: string) =>
    youtubeUrl?.includes("watch?v=")
      ? youtubeUrl.replace("watch?v=", "embed/")
      : youtubeUrl;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        style={{ x }}
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-2 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div {...bind()} className="w-full h-full">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) onClose();
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-full max-w-6xl h-[90vh] rounded-xl overflow-hidden shadow-lg flex flex-col sm:flex-row relative"
          >
            {/* ✖ Close */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* 📂 Toggle Playlist */}
            <button
              onClick={() => setShowPlaylist((prev) => !prev)}
              className="absolute top-2 left-2 z-10 bg-white text-xs px-3 py-1 rounded shadow hover:bg-gray-100"
            >
              {showPlaylist ? "Hide Playlist" : "Show Playlist"}
            </button>

            {/* 🎥 Video Area */}
            <div className="flex-1 bg-black">
              <iframe
                className="w-full h-full"
                src={getEmbedUrl(current.youtubeUrl)}
                title={current.title}
                allowFullScreen
              />
            </div>

            {/* 🎞 Playlist Panel */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  key="playlist"
                  initial={{ x: 320, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 320, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full sm:w-[320px] sm:min-w-[300px] bg-gray-100 h-72 sm:h-full overflow-y-auto border-l border-gray-300 px-3 py-4 space-y-2"
                >
                  <h3 className="text-sm font-bold text-gray-700 mb-2 px-1">
                    📺 Related Lectures
                  </h3>
                  {videos.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setCurrent(v)}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition ${
                        v.id === current.id
                          ? "bg-white border border-indigo-500"
                          : "hover:bg-white"
                      }`}
                    >
                      <img
                        src={v.thumbnail?.url}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/fallback-thumb.jpg";
                        }}
                        alt={v.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div
                        className="text-sm font-medium text-gray-800 line-clamp-2"
                        title={v.title}
                      >
                        {v.title}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
