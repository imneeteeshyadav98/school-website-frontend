"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal({
  embedUrl,
  title,
  onClose,
}: {
  embedUrl: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Video: ${title}`}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 100) onClose(); // swipe down threshold
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-lg relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center z-10"
          >
            ✕
          </button>

          {/* Video */}
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              title={title}
              allowFullScreen
            />
          </div>

          {/* Title */}
          <div className="p-3 text-center font-semibold text-base sm:text-lg">
            {title}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
