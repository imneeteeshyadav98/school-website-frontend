import React from 'react';

export type TimelineItem = {
  icon?: string;
  year: string;
  title: string;
};

type TimelineSectionProps = {
  timeline: TimelineItem[];
};

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  if (!timeline?.length) return null;

  return (
    <section className="text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Journey</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition space-y-2"
          >
            {item.icon && <div className="text-3xl">{item.icon}</div>}
            <p className="text-blue-600 font-semibold">{item.year}</p>
            <p className="text-gray-700">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
