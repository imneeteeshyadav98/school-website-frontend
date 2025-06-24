'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // ✅ Import next/image

type FacultyMember = {
  name: string;
  designation: string;
  photo: string;
  bio: string;
};

export default function FacultyCard({
  member,
  index,
}: {
  member: FacultyMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center w-full max-w-sm mx-auto"
    >
      {member.photo ? (
        <div className="w-24 h-24 relative mb-4">
          <Image
            src={member.photo}
            alt={member.name || 'Faculty'}
            width={96}
            height={96}
            className="rounded-full object-cover border-2 border-blue-500"
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
      )}
      <p className="text-lg font-bold text-gray-800">{member.name}</p>
      <p className="text-sm text-blue-600">{member.designation}</p>
      <p className="text-sm text-gray-600 mt-2 line-clamp-4">{member.bio}</p>
    </motion.div>
  );
}
