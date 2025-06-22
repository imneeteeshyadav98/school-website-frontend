export interface Video {
    id: number;
    title: string;
    subject: string;
    topic: string;
    classLevel: string;
    youtubeUrl: string;
    thumbnail?: { url: string };
    duration?: string;
    tags?: string[];
    publishedAt?: string | null;
  }
  