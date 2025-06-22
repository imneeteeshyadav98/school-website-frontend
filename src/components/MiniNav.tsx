'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'about-heading', label: 'About' },
  { id: 'vision', label: 'Vision' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'map', label: 'Map' },
];

export default function MiniNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-20 right-6 z-50 bg-white border shadow-lg rounded-full px-4 py-2 flex flex-col gap-2 transition ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
