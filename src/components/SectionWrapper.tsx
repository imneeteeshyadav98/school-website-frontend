'use client';
import { motion } from 'framer-motion';

export default function SectionWrapper({
  index,
  children,
  className = '',
  id,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const bg = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${bg} px-4 sm:px-6 py-16 ${className}`}
    >
      {children}
    </motion.section>
  );
}
