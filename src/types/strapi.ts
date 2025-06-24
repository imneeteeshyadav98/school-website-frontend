// types/strapi.ts
export interface StrapiResponse<T> {
    data: T;
  }
  
  export interface ProgramAttributes {
    title: string;
    description: string;
    icon?: { url: string };
    slug: string;
    highlightColor: string;
    available: boolean;
    stream: string;
    duration: string;
  }
  
  export interface ProgramItem {
    id: number;
    attributes: ProgramAttributes;
  }
  
  export interface VideoAttributes {
    title: string;
    youtubeUrl: string;
    subject: string;
    topic: string;
    classLevel: string;
    duration?: string;
    publishedAt?: string;
    thumbnail?: {
      url: string;
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  }
  
  export interface VideoItem {
    id: number;
    attributes: VideoAttributes;
  }
  
  export interface HomepageAttributes {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    heroImage?: { url: string }[];
  }
  
  export interface HomepageItem {
    id: number;
    attributes: HomepageAttributes;
  }
  