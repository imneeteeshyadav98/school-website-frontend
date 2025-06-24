import { GalleryItem } from "../types/gallery";

type StrapiResponse = {
  id: number;
  title?: string;
  category?: string;
  publishedat?: string;
  publishedAt?: string;
  photo?: { url: string; name: string }[];
  tags?: string | string[];
};

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gallery-items?populate=photo`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const items: StrapiResponse[] = json?.data;
    console.log(items);

    if (!Array.isArray(items)) {
      console.warn("⚠️ No valid gallery items.");
      return [];
    }

    return items.map((item) => {
      const photoData = item.photo || [];

      return {
        id: item.id,
        title: item.title || "Untitled",
        category: item.category || "Uncategorized",
        publishedAt:
          item.publishedat?.toString() ||
          item.publishedAt?.toString() ||
          "",
        photos: Array.isArray(photoData)
          ? photoData.map((img) => ({
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
              name: img.name,
            }))
          : [],
        tags: item.tags ? (Array.isArray(item.tags) ? item.tags : [item.tags]) : [],
      };
    });
  } catch (err) {
    console.error("❌ Error fetching gallery:", err);
    return [];
  }
}
