import { fetchAbout } from '@/lib/strapi';
import AboutSection from '@/components/AboutSection';

export default async function AboutPage() {
  const about = await fetchAbout();

  if (!about?.leftText || !about?.rightText) {
    return (
      <div className="p-10 text-center text-red-500">
        About content not found.
      </div>
    );
  }

  return (
    <main className="pt-12">
      <AboutSection
        title={about.title}
        leftText={about.leftText}
        rightText={about.rightText}
        ctaText={about.ctaText}
        ctaLink={about.ctaLink}
        coreValues={about.coreValues}
        highlightStats={about.highlightStats}
        timeline={about.timeline}
        principalName={about.principalName}
        principalMessage={about.principalMessage}
        principalPhoto={about.principalPhoto ?? undefined}
        promoVideoTitle={about.promoVideoTitle ?? undefined}
        promoVideoURL={about.promoVideoURL ?? undefined}
        promoVideoThumb={about.promoVideoThumb ?? undefined}
        facultyHighlight={about.facultyHighlight ?? []}
        testimonial={about.testimonials ?? []} // fixed prop name for consistency
        location={about.location ?? null}
      />
    </main>
  );
}