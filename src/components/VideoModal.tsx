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
      const isShort = parsed.pathname.startsWith("/shorts/");
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}?autoplay=1&modestbranding=1&rel=0`;
      }
      if (parsed.hostname.includes("youtube.com")) {
        const id = parsed.searchParams.get("v");
        return id
          ? `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`
          : isShort
          ? `https://www.youtube.com/embed${parsed.pathname}?autoplay=1&modestbranding=1&rel=0`
          : url;
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
          className="relative w-full max-w-6xl h-[60vh] sm:h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            title="Close"
            className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>

          {/* Iframe */}
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
