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
  const [current, setCurrent] = useState<Video>(initialVideo);
  const x = useMotionValue(0);

  // 🔁 Update modal content if video changes
  useEffect(() => {
    setCurrent(initialVideo);
  }, [initialVideo]);

  // 🔐 Escape key and scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // ✅ Embed logic with autoplay
  const getEmbedUrl = (url: string): string => {
    try {
      const parsed = new URL(url);
      const id =
        parsed.hostname.includes("youtu.be")
          ? parsed.pathname.slice(1)
          : parsed.searchParams.get("v");
      return id
        ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&modestbranding=1&rel=0`
        : url;
    } catch {
      return url;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        style={{ x }}
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-2 sm:px-4"
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
          className="bg-black w-full max-w-6xl h-[90vh] rounded-xl overflow-hidden shadow-2xl relative"
        >
          {/* ✖ Close */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center"
            title="Close"
          >
            ✕
          </button>

          {/* 🎬 Iframe player */}
          <div className="w-full h-full bg-black">
            <iframe
              className="w-full h-full"
              key={current.youtubeUrl} // 🔁 force reload when src changes
              src={getEmbedUrl(current.youtubeUrl)}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
