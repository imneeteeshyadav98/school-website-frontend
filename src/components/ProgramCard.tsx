"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

type Program = {
  title: string;
  description: string;
  icon?: string;
  slug: string;
  highlightColor: string;
  stream?: string;
};

const borderColorMap: Record<string, string> = {
  blue: "border-blue-400",
  green: "border-green-400",
  yellow: "border-yellow-400",
  red: "border-red-400",
  gray: "border-gray-300",
};

const streamClassMap: Record<string, string> = {
  Arts: "bg-blue-100 text-blue-800",
  Science: "bg-green-100 text-green-800",
  IT: "bg-yellow-100 text-yellow-800",
  General: "bg-gray-100 text-gray-700",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ProgramCard({ program }: { program: Program }) {
  const colorKey = program.highlightColor?.toLowerCase() || "blue";
  const borderClass = borderColorMap[colorKey] || "border-blue-400";

  const stream = program.stream || "General";
  const streamClass = streamClassMap[stream] || streamClassMap["General"];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      className={clsx(
        "border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        borderClass
      )}
    >
      <Link
        href={`/programs/${program.slug}`}
        className="block w-full h-full"
      >
        <span
          className={clsx(
            "inline-block text-xs font-medium px-3 py-1 rounded-full mb-3",
            streamClass
          )}
        >
          {stream}
        </span>

        {program.icon && (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.icon}`}
            alt={program.title}
            className="h-14 w-14 object-contain mb-4"
          />
        )}

        <h3 className="text-lg font-semibold mb-1">{program.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-4">{program.description}</p>

        <span className="mt-4 inline-block text-blue-600 hover:underline font-medium">
          Learn More →
        </span>
      </Link>
    </motion.div>
  );
}
