"use client";

import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

export default function VideoPlaylistModal({
  initialVideo,
  onClose,
}: {
  initialVideo: Video;
  onClose: () => void;
}) {
  const [current] = useState<Video>(initialVideo); // no switching
  const x = useMotionValue(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
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
          className="bg-white w-full max-w-6xl h-[90vh] rounded-xl overflow-hidden shadow-lg relative"
        >
          {/* ✖ Close */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>

          {/* 🎥 Video */}
          <div className="w-full h-full bg-black">
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(current.youtubeUrl)}
              title={current.title}
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
