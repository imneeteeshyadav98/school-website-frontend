// src/app/programs/[slug]/page.tsx

import { fetchProgramBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await fetchProgramBySlug(params.slug);
  return {
    title: `${program?.title || "Program"} | BRS Mahavidyalaya`,
    description: program?.description || "Explore academic program details",
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const program = await fetchProgramBySlug(params.slug);

  if (!program) return notFound();

  const { title, description, icon, stream, duration = "2 Years", highlightColor = "blue" } = program;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">{description}</p>
        {stream && (
          <span className={`inline-block text-sm font-medium px-4 py-1 rounded-full bg-${highlightColor.toLowerCase()}-100 text-${highlightColor.toLowerCase()}-800`}>
            Stream: {stream}
          </span>
        )}
      </div>

      {/* Icon Display */}
      {icon && (
        <div className="flex justify-center">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${icon}`}
            alt={title}
            className="h-24 w-24 object-contain rounded-lg shadow"
          />
        </div>
      )}

      {/* Program Highlights */}
      <div className="grid sm:grid-cols-2 gap-6 text-center">
        <div className="bg-blue-50 p-6 rounded shadow-sm">
          <h3 className="font-bold text-lg">⏳ Duration</h3>
          <p className="text-gray-600">{duration}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded shadow-sm">
          <h3 className="font-bold text-lg">📚 Stream</h3>
          <p className="text-gray-600">{stream || "General"}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/admissions"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
