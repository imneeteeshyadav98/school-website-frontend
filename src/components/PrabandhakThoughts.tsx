'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchPrabandhakThought } from '@/lib/strapi';
import { marked } from 'marked';

type Thought = {
  name: string;
  designation: string;
  message: string;
  photoUrl: string | null;
};

export default function PrabandhakThoughts() {
  const [thought, setThought] = useState<Thought | null>(null);
  const [htmlMessage, setHtmlMessage] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPrabandhakThought();
        if (data) {
          setThought(data);
          const parsed = await marked.parse(data.message || '');
          setHtmlMessage(parsed);
        }
      } catch (err) {
        console.error("❌ Error loading Prabandhak Thoughts:", err);
      }
    };

    loadData();
  }, []);

  if (!thought) {
    return (
      <div className="text-center text-gray-500 py-8 animate-pulse">
        🔄 Loading Prabandhak Thoughts...
      </div>
    );
  }
  
  return (
    <section
      id="prabandhak-thoughts"
      className="bg-gradient-to-br from-gray-50 to-white py-12 px-4 md:px-8 border-t border-gray-200 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center md:text-left text-center animate-fade-in">
        {/* 📸 Photo */}
        <div className="md:col-span-2 flex justify-center">
          <Image
            src={thought.photoUrl || '/images/default-avatar.jpg'}
            alt={`प्रबंधक ${thought.name} का फोटो`}
            width={250}
            height={250}
            className="rounded-lg shadow-md object-cover"
            priority
          />
        </div>

        {/* 💬 Message */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center md:justify-start gap-2">
            <span>💬</span> <span>प्रबंधक का संदेश</span>
          </h2>
          <blockquote
            className="text-gray-700 leading-relaxed prose max-w-none italic border-l-4 border-blue-600 pl-4"
            dangerouslySetInnerHTML={{ __html: htmlMessage }}
          />
          <p className="mt-4 text-sm text-gray-600 font-semibold italic">
            — {thought.name}, {thought.designation}
          </p>
        </div>
      </div>
    </section>
  );
}
