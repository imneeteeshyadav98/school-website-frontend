// src/components/AboutSection.tsx

'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import CoreValuesGrid from './CoreValuesGrid';
import VisionMission from './VisionMission';
import FacultyCard from './FacultyCard';
import TimelineSection from './TimelineSection';
import PrincipalSection from './PrincipalSection';
import PromoVideoSection from './PromoVideoSection';
import HighlightStatsGrid from './HighlightStatsGrid';
import LocationMap from './LocationMap';
import SectionWrapper from './SectionWrapper';

const TestimonialCarousel = dynamic(() => import('./TestimonialCarousel'), { ssr: false });

const DangerousHTMLSection = ({ leftText, rightText }: { leftText: string; rightText: string }) => (
  <section className="grid md:grid-cols-2 gap-6">
    <div dangerouslySetInnerHTML={{ __html: leftText }} className="prose prose-blue max-w-none" />
    <div dangerouslySetInnerHTML={{ __html: rightText }} className="prose prose-blue max-w-none" />
  </section>
);

type AboutProps = {
  title?: string;
  leftText: string;
  rightText: string;
  vision?: string;
  mission?: string;
  coreValues?: { icon: string; title: string; subtitle?: string }[];
  highlightStats?: { icon?: string; label: string; value: string }[];
  timeline?: { icon?: string; year: string; title: string }[];
  principalName?: string;
  principalMessage?: string;
  principalPhoto?: string;
  promoVideoURL?: string;
  promoVideoTitle?: string;
  promoVideoThumb?: string;
  promoVideoType?: 'youtube' | 'file';
  facultyHighlight?: { name: string; designation: string; photo: string; bio: string }[];
  testimonial?: { name: string; role: string; message: string; photo: string; rating: number }[];
  location?: { latitude: number; longitude: number; address?: string } | null;
};

export default function AboutSection({
  title = 'About Us',
  leftText,
  rightText,
  vision = 'To be a beacon of educational transformation in rural India.',
  mission = 'To empower students with knowledge, skills, and values through holistic education.',
  coreValues = [],
  highlightStats = [],
  timeline = [],
  principalName,
  principalMessage,
  principalPhoto,
  promoVideoURL,
  promoVideoTitle,
  promoVideoThumb,
  promoVideoType,
  facultyHighlight = [],
  testimonial = [],
  location,
}: AboutProps) {
  let index = 0;

  return (
    <div className="max-w-7xl mx-auto relative scroll-smooth">
      <SectionWrapper index={index++} id="about">
        <h2 id="about-title" className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          {title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded" />
      </SectionWrapper>

      {highlightStats.length > 0 && (
        <SectionWrapper index={index++}>
          <HighlightStatsGrid stats={highlightStats} />
        </SectionWrapper>
      )}

      <SectionWrapper index={index++} id="vision-mission">
        <VisionMission vision={vision} mission={mission} />
      </SectionWrapper>

      <SectionWrapper index={index++}>
        <DangerousHTMLSection leftText={leftText} rightText={rightText} />
      </SectionWrapper>

      <SectionWrapper index={index++} id="core-values">
        <CoreValuesGrid values={coreValues} />
      </SectionWrapper>

      {(principalMessage || principalPhoto || principalName) && (
        <SectionWrapper index={index++} id="principal">
          <PrincipalSection
            principalName={principalName}
            principalPhoto={principalPhoto}
            principalMessage={principalMessage}
          />
        </SectionWrapper>
      )}

      {timeline.length > 0 && (
        <SectionWrapper index={index++} id="timeline">
          <TimelineSection timeline={timeline} />
        </SectionWrapper>
      )}

      {promoVideoURL && (
        <SectionWrapper index={index++} id="campus-tour">
          <PromoVideoSection
            videoUrl={promoVideoURL}
            videoTitle={promoVideoTitle}
            videoThumb={promoVideoThumb}
            videoType={promoVideoType}
          />
        </SectionWrapper>
      )}

      {facultyHighlight.length > 0 && (
        <SectionWrapper index={index++} id="faculty" className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h3 id="faculty-title" className="text-2xl font-semibold text-gray-800 mb-6">Meet Our Faculty</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {facultyHighlight.map((member, i) => (
                <FacultyCard key={i} member={member} index={i} />
              ))}
            </div>
          </motion.div>
        </SectionWrapper>
      )}

      {testimonial.length > 0 && (
        <SectionWrapper index={index++} id="testimonials">
          <TestimonialCarousel testimonial={testimonial} />
        </SectionWrapper>
      )}

      {location?.address && (
        <SectionWrapper index={index++} id="location">
          <LocationMap address={location.address} />
        </SectionWrapper>
      )}
    </div>
  );
}
