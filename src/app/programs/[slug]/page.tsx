// src/app/programs/[slug]/page.tsx
import { fetchProgramBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const program = await fetchProgramBySlug(params.slug);
  return {
    title: `${program?.title || "Program"} | BRS Mahavidyalaya`,
    description: program?.description || "Explore academic program details",
  };
}

// ✅ Avoid TS type for `params`, let Next.js infer
export default async function Page({ params }: any) {
  const program = await fetchProgramBySlug(params.slug);
  if (!program) return notFound();

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">{program.title}</h1>
      <p>{program.description}</p>

      {program.icon && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.icon}`}
          alt={program.title}
          width={80}
          height={80}
        />
      )}

      <div>
        <p><strong>Stream:</strong> {program.stream}</p>
        <p><strong>Duration:</strong> {program.duration}</p>
      </div>
    </div>
  );
}
