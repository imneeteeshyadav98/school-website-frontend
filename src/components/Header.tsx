'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // ✅ Import next/image
import { fetchLogo } from '@/lib/strapi';

export default function Header() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchLogo().then((url) => setLogoUrl(url));
  }, []);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Name */}
        <Link href="/" className="text-lg font-bold text-blue-700 flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Logo"
              width={32}
              height={32}
              unoptimized // ✅ External CMS logo
              className="h-8 w-8 object-contain"
            />
          ) : (
            <span>Loading...</span>
          )}
          <span className="hidden sm:inline">BRS Mahavidyalaya</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/about">About</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/lectures">Lectures</Link>
          <Link href="/gallery">Gallery</Link> {/* ✅ New Link Added */}
        </nav>

        {/* Language + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button className="text-sm border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">
            English
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded border border-gray-300"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-700">
          <Link href="/about" className="block">About</Link>
          <Link href="/programs" className="block">Programs</Link>
          <Link href="/lectures" className="block">Lectures</Link>
          <Link href="/gallery" className="block">Gallery</Link> {/* ✅ Mobile Link */}
        </div>
      )}
    </header>
  );
}
