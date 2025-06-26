'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { FacultyMember } from '@/lib/fetchFaculty';

export default function FacultyCard({
  member,
  index,
}: {
  member: FacultyMember;
  index: number;
}) {
  if (!member || typeof member !== 'object') return null;

  const { name, designation, bio, photo } = member;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-full max-w-sm flex flex-col items-center text-center"
    >
      {photo ? (
        <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-blue-500 shadow-sm relative">
          <Image
            src={photo}
            alt={name || 'Faculty'}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-28 h-28 mb-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm shadow-inner">
          No Image
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900">{name || 'Unnamed'}</h3>
      <p className="text-sm text-blue-600 font-medium mt-1">
        {designation || 'Designation'}
      </p>
      <p className="text-sm text-gray-600 mt-2 leading-snug max-w-xs">
        {typeof bio === 'string' ? bio : 'No bio available.'}
      </p>
    </motion.div>
  );
}
