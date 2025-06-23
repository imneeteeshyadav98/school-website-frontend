import axios from 'axios';
import { marked } from "marked";
import { collectSegmentData } from 'next/dist/server/app-render/collect-segment-data';
import { title } from 'process';
import { Video } from "../types/video";
const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
const token = process.env.STRAPI_API_TOKEN;

const strapi = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchHomepage = async () => {
    try {
      const res = await strapi.get('/homepages?populate=heroImage');
      const items = res.data.data;
  
      console.log('🔍 Full API response:', items);
  
      if (items.length && items[0]) {
        const data = items[0];
  
        // Normalize image path
        const heroImage = data.heroImage?.[0]?.url
          ? [data.heroImage[0]]
          : [];
  
        const homepage = {
          title: data.title,
          description: data.description,
          ctaText: data.ctaText,
          ctaLink: data.ctaLink,
          heroImage,
        };
  
        console.log('✅ Normalized homepage:', homepage);
        return homepage;
      }
  
      console.warn('⚠️ Homepage entry missing or malformed.');
      return null;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Axios error:', error.response?.data || error.message);
      } else {
        console.error('❌ Unknown CMS fetch error:', error);
      }
      return null;
    }
  };
  
  export const fetchLogo = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/logo?populate=logo`);
      const logoData = res.data?.data?.logo?.formats;
      const logoUrl =
        logoData?.small?.url || res.data?.data?.logo?.url || null;
  
      const fullLogo = logoUrl ? `${baseURL}${logoUrl}` : null;
      console.log("🖼️ Logo URL:", fullLogo);
  
      return fullLogo;
    } catch (error) {
      console.error("❌ Failed to fetch logo from Strapi:", error);
      return null;
    }
  };
  
  export const fetchAbout = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/about-uses?populate=*`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
  
      const items = res.data?.data;
      console.log("🧾 Raw About Items:", items);
  
      if (!Array.isArray(items) || items.length === 0) {
        console.warn("⚠️ About section is empty or malformed.");
        return null;
      }
  
      const item = items[0];
  
      const resolveImage = (imgObj: any): string | null =>
        imgObj?.url ? `${baseURL}${imgObj.url}` : null;
  
      const principalPhoto = resolveImage(item?.principalPhoto);
      console.log("📸 Principal Photo:", principalPhoto);
  
      const promoVideoThumb = item?.promoVideoThumb?.[0]?.url
        ? `${baseURL}${item.promoVideoThumb[0].url}`
        : null;
  
      return {
        title: item.title || "About Us",
        leftText: await marked.parse(item.leftText || ""),
        rightText: await marked.parse(item.rightText || ""),
        ctaText: item.ctaText || "",
        ctaLink: item.ctaLink || "",
        principalName: item.principalName || "",
        principalMessage: item.principalMessage || "",
        principalPhoto,
        promoVideoType: item.promoVideoType || "",
  
        coreValues: Array.isArray(item.coreValues)
          ? item.coreValues.map((v: any) => ({
              icon: v.icon || "✔️",
              title: v.title || "",
              subtitle: v.subtitle || "",
            }))
          : [],
  
        highlightStats: Array.isArray(item.highlightStats)
          ? item.highlightStats.map((h: any) => ({
              icon: h.icon || "",
              label: h.label || "",
              value: h.value || "",
              description: h.description || "",
            }))
          : [],
  
        timeline: Array.isArray(item.timeline)
          ? item.timeline.map((t: any) => ({
              icon: t.icon || "",
              year: t.year || "",
              title: t.title || "",
            }))
          : [],
  
        promoVideoURL: item.promoVideoURL || "",
        promoVideoTitle: item.promoVideoTitle || "",
        promoVideoThumb,
  
        milestones: Array.isArray(item.milestones)
          ? item.milestones.map((m: any) => ({
              icon: m.icon || "",
              year: m.year || "",
              title: m.title || "",
              description: m.description || "",
            }))
          : [],
  
        facultyHighlight: Array.isArray(item.FacultyHighlight)
          ? item.FacultyHighlight.map((f: any, i: number) => {
              const photo = resolveImage(f.photo);
              console.log(`👨‍🏫 Faculty[${i}] Photo:`, photo);
              return {
                name: f.name || "",
                designation: f.designation || "",
                bio: f.bio || "",
                photo,
              };
            })
          : [],
  
          testimonials: Array.isArray(item.Testimonial)
          ? item.Testimonial.map((t: any, i: number) => {
              const photo = resolveImage(t.photo);
              const rating = typeof t.rating === 'number' ? t.rating : 5; // default fallback to 5
              console.log(`💬 Testimonial[${i}] Photo:`, photo);
              return {
                name: t.name || "",
                message: t.message || "",
                role: t.role || "",
                photo,
                rating,
              };
            })
          : [],
        
  
        location: item.LocationInfo
          ? {
              latitude: item.LocationInfo.latitude || 0,
              longitude: item.LocationInfo.longitude || 0,
              address: item.LocationInfo.address || "",
            }
          : null,
      };
    } catch (error) {
      console.error("❌ Failed to fetch About section:", error);
      return null;
    }
  };
  
// lib/strapi.ts
export async function fetchPrograms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/programs?populate=icon`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  const programs = json?.data || [];

  console.log("Programs Logs", programs);

  return programs
    .filter((item: any) => !!item) // Remove unnecessary .attributes check
    .map((item: any) => ({
      title: item.title ?? "Untitled",
      description: item.description ?? "",
      icon: item.icon?.url ?? null,
      slug: item.slug ?? "",
      highlightColor: (item.highlightColor || "blue").toLowerCase(),
      available: item.available ?? true,
      stream: item.stream ?? "General",
      duration: item.duration ?? "2 Years",
    }));
}


export async function fetchProgramBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/programs?filters[slug][$eq]=${slug}&populate=icon`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  const item = json?.data?.[0];

  if (!item) {
    console.warn("No program found for slug:", slug);
    return null;
  }

  // 🔥 If your data is NOT wrapped in attributes
  return {
    title: item.title ?? "Untitled Program",
    description: item.description ?? "",
    slug: item.slug ?? slug,
    highlightColor: (item.highlightColor || "blue").toLowerCase(),
    icon: item.icon?.url ?? null,
    stream: item.stream ?? "General",
    duration: item.duration ?? "2 Years",
  };
}


  export async function fetchVideoLectures(): Promise<Video[]> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/video-lectures?populate=*`, {
        next: { revalidate: 60 },
      });
      console.log(res)
      if (!res.ok) {
        console.error("❌ Failed to fetch videos:", res.statusText);
        return [];
      }
  
      const json = await res.json();
      const data = json?.data;
  
      if (!Array.isArray(data)) {
        console.warn("⚠️ Unexpected video format from API:", data);
        return [];
      }
  
      const videos: Video[] = data.map((item: any, i: number) => {
        const {
          id,
          title,
          subject,
          topic,
          classLevel,
          youtubeUrl,
          thumbnail,
        } = item;
  
        // Thumbnail URL (if attached via media)
        const thumbUrl = thumbnail?.data?.attributes?.url;
        const resolvedThumbnail = thumbUrl
          ? { url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbUrl}` }
          : undefined;
  
        // Logging missing fields
        if (!title) console.warn(`⚠️ [Video ${i}] Missing title`);
        if (!subject) console.warn(`⚠️ [Video ${i}] Missing subject`);
        if (!youtubeUrl) console.warn(`⚠️ [Video ${i}] Missing youtubeUrl`);
        if (!classLevel) console.warn(`⚠️ [Video ${i}] Missing classLevel`);
        if (!thumbUrl) console.warn(`⚠️ [Video ${i}] Missing thumbnail URL`);
  
        return {
          id,
          title: title?.trim() || "Untitled",
          subject: subject?.trim() || "Unknown",
          topic: topic?.trim() || "",
          classLevel: classLevel?.trim() || "Unknown",
          youtubeUrl: youtubeUrl?.trim() || "",
          thumbnail: resolvedThumbnail,
        };
      });
  
      console.log("🎥 Fetched videos:", videos);
      return videos;
    } catch (error) {
      console.error("❌ Error fetching videos:", error);
      return [];
    }
  }
  




  // import { Video } from '@/types/video';

  export function parseVideo(entry: any): Video {
    const { id, attributes } = entry;
  
    return {
      id,
      title: attributes.title,
      youtubeUrl: attributes.youtubeUrl,
      subject: attributes.subject || 'Unknown',
      topic: attributes.topic || '',
      classLevel: attributes.classLevel || 'Unknown',
      duration: attributes.duration || '',
      publishedAt: attributes.publishedAt,
      // Add any other fields you're using
    };
  }

  export async function fetchTopVideos(): Promise<Video[]> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage-setting?populate[top_videos][populate]=*`, {
        cache: "no-store",
      });
  
      console.log("Data Response", res);
  
      if (!res.ok) {
        console.error("❌ Failed to fetch top videos:", res.statusText);
        return [];
      }
  
      const json = await res.json();
      console.log("Parsed JSON", json);
  
      const videosData = json?.data?.top_videos;
      console.log("Videos Data", videosData);
  
      if (!Array.isArray(videosData)) {
        console.warn("⚠️ top_videos relation not an array.");
        return [];
      }
  
      return videosData.map((entry: any) => ({
        id: entry.id,
        title: entry.title || '',
        youtubeUrl: entry.youtubeUrl || '',
        subject: entry.subject || 'Unknown',
        topic: entry.topic || '',
        classLevel: entry.classLevel || 'Unknown',
        duration: entry.duration || '',
        publishedAt: entry.publishedAt || '',
        thumbnail: entry.thumbnail?.url
          ? { url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${entry.thumbnail.url}` }
          : undefined,
      }));
    } catch (error) {
      console.error("❌ Error fetching top videos:", error);
      return [];
    }
  }
  
  
  
  