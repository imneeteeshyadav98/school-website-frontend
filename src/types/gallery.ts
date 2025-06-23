export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    publishedAt: string;
    photos: { url: string; name: string }[];
    tags?: string | string[]; // allow both
  }
  