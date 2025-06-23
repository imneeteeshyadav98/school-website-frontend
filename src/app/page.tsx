import { fetchHomepage, fetchAbout, fetchPrograms, fetchTopVideos } from "@/lib/strapi";
import AboutSection from "@/components/AboutSection";
import ProgramSection from "@/components/ProgramSection";
import CarouselVideoSection from "@/components/CarouselVideoSection";
import ClientPrabandhakThoughts from "@/components/ClientPrabandhakThoughts"; // this should be the client wrapper component

export default async function HomePage() {
  const [homepage, about, programs, topVideos] = await Promise.all([
    fetchHomepage(),
    fetchAbout(),
    fetchPrograms(),
    fetchTopVideos(),
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