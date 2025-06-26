// pages/gallery/page.tsx or app/gallery/page.tsx
export const dynamic = 'force-dynamic'; // ✅ this disables static optimization

import { fetchGalleryItems } from "@/lib/fetchGalleryItems";
import GallerySection from "@/components/GallerySection";

export default async function GalleryPage() {
  const items = await fetchGalleryItems();
  return <GallerySection items={items} />;
}
