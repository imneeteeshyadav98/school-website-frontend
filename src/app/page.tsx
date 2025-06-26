// app/page.tsx
export const dynamic = 'force-dynamic';

import { fetchHomepage, fetchAbout, fetchPrograms, fetchTopVideos } from "@/lib/strapi";
import AboutSection from "@/components/AboutSection";
import ProgramSection from "@/components/ProgramSection";
import CarouselVideoSection from "@/components/CarouselVideoSection";
import ClientPrabandhakThoughts from "@/components/ClientPrabandhakThoughts";
import { fetchGalleryItems } from "@/lib/fetchGalleryItems";
import GalleryPreview from "@/components/GalleryPreview";

export default async function HomePage() {
  const [homepage, about, programs, topVideos, galleryItems] = await Promise.all([
    fetchHomepage(),
    fetchAbout(),
    fetchPrograms(),
    fetchTopVideos(),
    fetchGalleryItems(),
  ]);

  if (!homepage) {
    return (
      <div className="p-10 text-center text-red-500">
        No homepage content found.
      </div>
    );
  }

  const imageUrl = homepage.heroImage?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${homepage.heroImage[0].url}`
    : undefined;

  return (
    <main className="space-y-24 scroll-smooth">
      {/* 🎯 Hero Section - Netflix-style */}
      <section
        className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="relative z-10 max-w-3xl px-4 text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            {homepage.title}
          </h1>
          <p className="text-lg md:text-xl font-light drop-shadow-md">
            {homepage.description}
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            {homepage.ctaText && homepage.ctaLink && (
              <a
                href={homepage.ctaLink}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-medium"
              >
                {homepage.ctaText}
              </a>
            )}
            <a
              href="/about"
              className="px-6 py-3 bg-white text-blue-700 rounded hover:bg-gray-100 transition font-medium"
            >
              Learn more about us →
            </a>
          </div>
        </div>
      </section>

      {/* 🔥 Top Educational Videos Carousel */}
      {topVideos && topVideos.length > 0 && (
        <CarouselVideoSection videos={topVideos} />
      )}

      {/* 💬 प्रबंधक के विचार */}
      <section id="prabandhak-thoughts" className="scroll-mt-24">
        <ClientPrabandhakThoughts />
      </section>

      {/* 🎓 Programs Section */}
      <ProgramSection programs={programs} />

      {/* 🖼️ Gallery Preview */}
      {galleryItems && galleryItems.length > 0 && (
        <section id="gallery-preview" className="scroll-mt-24 px-4">
          <h2 className="text-2xl font-bold text-center mb-6">📷 Memories from Campus</h2>
          <GalleryPreview items={galleryItems.slice(0, 4)} />
          <div className="text-center mt-6">
            <a
              href="/gallery"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
              View Full Gallery
            </a>
          </div>
        </section>
      )}

      {/* 🧠 About Section */}
      {about?.leftText && about?.rightText && (
        <AboutSection
          title={about.title}
          leftText={about.leftText}
          rightText={about.rightText}
          // ctaText={about.ctaText}
          // ctaLink={about.ctaLink}
          coreValues={about.coreValues}
        />
      )}
    </main>
  );
}
