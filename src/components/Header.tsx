'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchLogo } from '@/lib/strapi';

export default function Header() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo().then((url) => setLogoUrl(url));
  }, []);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-blue-700 flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-8 w-8 object-contain" />
          ) : (
            <span>Loading...</span>
          )}
          BRS Mahavidyalaya
        </Link>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
  <Link href="/about">About</Link>
  <Link href="/admissions">Admissions</Link>
  <Link href="/academics">Academics</Link>
  <Link href="/programs">Programs</Link>
  <Link href="/lectures">Lectures</Link>
  <Link href="/student-corner">Student Corner</Link>
</nav>
        <button className="text-sm border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">
          English
        </button>
      </div>
    </header>
  );
}
