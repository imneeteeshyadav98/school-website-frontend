import { fetchGalleryItems } from "@/lib/fetchGalleryItems";
import GallerySection from "@/components/GallerySection";

export default async function GalleryPage() {
  const items = await fetchGalleryItems();
  return <GallerySection items={items} />;
}
