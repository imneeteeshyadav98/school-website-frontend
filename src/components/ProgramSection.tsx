'use client';

import React from "react";
import ProgramCard from "./ProgramCard";
import { motion, type Variants } from "framer-motion";

type Program = {
  title: string;
  description: string;
  icon?: string;
  slug: string;
  highlightColor: string;
  available: boolean;
  stream?: string;
};

// ✅ Animation variants for staggered entrance
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function ProgramSection({ programs }: { programs: Program[] }) {
  const visiblePrograms = programs.filter((p) => p.available);

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="max-w-6xl mx-auto px-4 py-20 space-y-12 scroll-mt-24"
    >
      <h2
        id="programs-heading"
        className="text-3xl sm:text-4xl font-bold text-center"
      >
        Our Programs
      </h2>

      {visiblePrograms.length === 0 ? (
        <p className="text-center text-gray-500">No programs available at the moment.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {visiblePrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
