// components/HighlightStatsGrid.tsx
'use client';

import { motion } from 'framer-motion';

export type HighlightStat = {
  icon?: string;
  label: string;
  value: string;
};

type HighlightStatsGridProps = {
  stats: HighlightStat[];
};

export default function HighlightStatsGrid({ stats }: HighlightStatsGridProps) {
  if (!stats?.length) return null;

  return (
    <motion.section
      className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
          {stat.icon && <div className="text-4xl mb-2">{stat.icon}</div>}
          <p className="text-xl font-bold text-blue-700">{stat.value}</p>
          <p className="text-sm text-gray-700">{stat.label}</p>
        </div>
      ))}
    </motion.section>
  );
}
