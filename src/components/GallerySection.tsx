'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchGalleryItems } from "@/lib/fetchGalleryItems";
import { GalleryItem } from "@/types/gallery";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filtered, setFiltered] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [loading, setLoading] = useState(true);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    fetchGalleryItems().then((data) => {
      const sorted = data.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      setItems(sorted);
      setLoading(false);
    });
  }, []);

  const categoryColorMap: Record<string, string> = {
    Sports: "bg-green-600",
    Cultural: "bg-pink-600",
    Academic: "bg-purple-600",
  };

  useEffect(() => {
    let updated = [...items];
    if (selectedCategory) updated = updated.filter((i) => i.category === selectedCategory);
    if (selectedTag) updated = updated.filter((i) => Array.isArray(i.tags) && i.tags.includes(selectedTag));
    if (searchQuery.trim()) updated = updated.filter((i) => i.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFiltered(updated);
  }, [items, selectedCategory, selectedTag, searchQuery]);

  const paginatedItems = filtered.slice(0, page * itemsPerPage);
  const uniqueCategories = [...new Set(items.map((i) => i.category))];
  const uniqueTags = Array.from(new Set(items.flatMap((i) => (Array.isArray(i.tags) ? i.tags : []))));

  const openLightbox = (photos: string[], index: number) => setLightbox({ photos, index });
  const closeLightbox = () => setLightbox(null);
  const nextPhoto = () => lightbox && lightbox.index < lightbox.photos.length - 1 && setLightbox({ ...lightbox, index: lightbox.index + 1 });
  const prevPhoto = () => lightbox && lightbox.index > 0 && setLightbox({ ...lightbox, index: lightbox.index - 1 });

  // Auto slideshow for lightbox
  useEffect(() => {
    if (lightbox) {
      autoPlayRef.current = setInterval(() => {
        setLightbox((current) => {
          if (!current) return null;
          const nextIndex = current.index + 1;
          if (nextIndex < current.photos.length) {
            return { ...current, index: nextIndex };
          } else {
            return { ...current, index: 0 }; // loop to start
          }
        });
      }, 4000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [lightbox]);

  // Swipe gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevPhoto();
    else if (deltaX < -50) nextPhoto();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (page > 1) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-4">📸 Gallery</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }}
        className="block mx-auto mb-6 px-4 py-2 w-full max-w-md rounded border border-gray-300 shadow-sm"
      />

      {uniqueCategories.length > 1 && (
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setPage(1);
            }}
            className={`px-4 py-1 rounded-full border shadow ${!selectedCategory ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          >
            All Categories
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
              className={`px-4 py-1 rounded-full border shadow ${selectedCategory === cat ? `${categoryColorMap[cat] || "bg-blue-600"} text-white` : "bg-white text-blue-600"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {uniqueTags.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1 rounded-full border shadow ${!selectedTag ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          >
            All Tags
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1 rounded-full border shadow ${selectedTag === tag ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-gray-200 animate-pulse h-[250px] rounded shadow" />
          ))}
        </div>
      ) : paginatedItems.length === 0 ? (
        <p className="text-center text-gray-500">No gallery items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedItems.map((item) =>
            item.photos.map((photo, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => openLightbox(item.photos.map((p) => p.url), idx)}
                className="bg-white rounded shadow overflow-hidden cursor-pointer group relative"
              >
                <div className="relative bg-white overflow-hidden group rounded">
                  <div className="relative z-10">
                    <Image
                      src={photo.url}
                      alt={photo.name || item.title}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 z-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="text-white text-3xl">🔍</span>
                  </div>
                  {item.tags && (Array.isArray(item.tags) ? item.tags.length > 0 : true) && (
                    <span className="absolute top-2 left-2 z-30 bg-white text-xs text-black px-2 py-1 rounded-full shadow">
                      {Array.isArray(item.tags) ? item.tags[0] : item.tags}
                    </span>
                  )}
                </div>
                <div className="p-2 bg-gray-900 text-white text-center text-sm truncate">
                  {item.title}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!loading && filtered.length > page * itemsPerPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white text-2xl">✕</button>
          <button onClick={prevPhoto} className="absolute left-4 text-white text-3xl p-2" disabled={lightbox.index === 0}>⟨</button>
          <div className="flex items-center justify-center max-w-[90%] max-h-[90vh]">
            <img
              src={lightbox.photos[lightbox.index]}
              alt="Preview"
              className="max-h-[90vh] object-contain rounded shadow-lg animate-fade"
              loading="lazy"
            />
          </div>
          <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
          <button onClick={nextPhoto} className="absolute right-4 text-white text-3xl p-2" disabled={lightbox.index === lightbox.photos.length - 1}>⟩</button>
        </div>
      )}
    </section>
  );
}
