'use client';

import Image from "next/image";
import { useState } from "react";
import { GalleryItem } from "@/types/gallery";

type Props = {
  items: GalleryItem[];
};

export default function GalleryPreview({ items }: Props) {
  const previewPhotos = items
    .flatMap((item) =>
      item.photos.map((photo) => ({
        ...photo,
        title: item.title,
      }))
    )
    .slice(0, 8); // Show only first 8

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section className="px-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer group bg-white aspect-[4/3]"
            >
              {/* Default Cropped Image */}
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                unoptimized
              />

              {/* Full Image on Hover */}
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white"
                unoptimized
              />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 text-black text-sm text-center px-2 py-1 truncate z-10">
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox view on click */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            ×
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={previewPhotos[lightboxIndex].url}
              alt="Preview"
              fill
              className="object-contain rounded shadow-lg"
              unoptimized
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
