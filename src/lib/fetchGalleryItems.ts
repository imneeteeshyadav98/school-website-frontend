import { GalleryItem } from "../types/gallery";

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gallery-items?populate=photo`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const items = json?.data;
    console.log(items)

    if (!Array.isArray(items)) {
      console.warn("⚠️ No valid gallery items.");
      return [];
    }

    return items.map((item: any) => {
      const photoData = item.photo || [];

      return {
        id: item.id,
        title: item.title || "Untitled",
        category: item.category || "Uncategorized",
        publishedAt: item.publishedat || item.publishedAt || null,
        photos: Array.isArray(photoData)
          ? photoData.map((img: any) => ({
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
              name: img.name,
            }))
          : [],
        tags: item.tags ? [item.tags] : [],
      };
    });
  } catch (err) {
    console.error("❌ Error fetching gallery:", err);
    return [];
  }
}
