"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal({
  youtubeUrl,
  title,
  onClose,
}: {
  youtubeUrl: string;
  title: string;
  onClose: () => void;
}) {
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

  const getEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }
      if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="relative w-full h-[60vh] sm:w-[90%] sm:h-[80vh] bg-black rounded-lg overflow-hidden shadow-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>

          <iframe
            className="w-full h-full"
            src={getEmbedUrl(youtubeUrl)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
