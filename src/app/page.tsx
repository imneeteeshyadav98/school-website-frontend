import { fetchHomepage, fetchAbout, fetchPrograms, fetchTopVideos } from "@/lib/strapi";
import AboutSection from "@/components/AboutSection";
import ProgramSection from "@/components/ProgramSection";
import CarouselVideoSection from "@/components/CarouselVideoSection";
import ClientPrabandhakThoughts from "@/components/ClientPrabandhakThoughts"; // this should be the client wrapper component
import { fetchGalleryItems } from "@/lib/fetchGalleryItems"; // ✅ Correct path if that's where you defined it
import GallerySection from "@/components/GallerySection";
import GalleryPreview from "@/components/GalleryPreview";

export default async function HomePage() {
  const [homepage, about, programs, topVideos,galleryItems] = await Promise.all([
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
      {/* 🎯 Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">{homepage.title}</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">{homepage.description}</p>
        {imageUrl && (
          <div className="mx-auto max-w-3xl shadow-lg rounded overflow-hidden">
            <img
              src={imageUrl}
              alt="Hero"
              className="w-full object-cover rounded"
            />
          </div>
        )}
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          {homepage.ctaText && homepage.ctaLink && (
            <a
              href={homepage.ctaLink}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              {homepage.ctaText}
            </a>
          )}
          <a
            href="/about"
            className="text-blue-600 underline font-medium hover:text-blue-800 transition px-6 py-3"
          >
            Learn more about us →
          </a>
        </div>
      </section>

      {/* 🔥 Top Educational Videos Carousel */}
      {topVideos && topVideos.length > 0 && (
        <CarouselVideoSection videos={topVideos} />
      )}

      {/* 💬 प्रबंधक के विचार (Prabandhak Message Section) */}
      <section id="prabandhak-thoughts" className="scroll-mt-24">
        <ClientPrabandhakThoughts />
      </section>

      {/* 🎓 Programs Section */}
      <ProgramSection programs={programs} />
      {/* 🖼️ Gallery Section Preview */}
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
          ctaText={about.ctaText}
          ctaLink={about.ctaLink}
          coreValues={about.coreValues}
        />
      )}
    </main>
  );
}