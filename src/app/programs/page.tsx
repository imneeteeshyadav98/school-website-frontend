// src/app/programs/page.tsx

import { fetchPrograms } from "@/lib/strapi";
import type { Metadata } from "next";
import ProgramsPageClient from "@/components/ProgramsPageClient";

export const metadata: Metadata = {
  title: "Programs | BRS Mahavidyalaya",
  description: "Explore academic programs offered by BRS Mahavidyalaya including Intermediate, B.A., B.Sc., and more.",
};

export default async function ProgramsPage() {
  const programs = await fetchPrograms();

  return (
    <main className="min-h-screen py-16 px-4">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">Our Academic Programs</h1>
        <p className="text-gray-600 mt-2">
          Discover our offerings across Intermediate and Undergraduate streams.
        </p>
      </section>

      {/* Program Filters + Listing */}
      <ProgramsPageClient programs={programs} />
    </main>
  );
}
