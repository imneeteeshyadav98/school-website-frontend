// src/app/faculty/page.tsx

import FacultyCard from '@/components/FacultyCard';
import { fetchFaculty } from '../..//lib/fetchFaculty';
import type { FacultyMember } from '../../lib/fetchFaculty';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Faculty',
  description: 'Meet the amazing teachers who power our institution.',
};

export default async function FacultyPage() {
  const facultyMembers = await fetchFaculty(); // fetch ALL faculty

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Meet Our Faculty</h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {facultyMembers.map((member, index) => (
          <FacultyCard key={index} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
