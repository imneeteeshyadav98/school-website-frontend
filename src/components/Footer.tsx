'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // ✅ Import next/image
import { fetchLogo } from '@/lib/strapi';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo().then((url) => setLogoUrl(url));
  }, []);

  return (
    <footer className="w-full border-t bg-gray-100 mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
        {/* Logo & About */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Logo"
                width={32}
                height={32}
                unoptimized // ✅ necessary for external dynamic images (e.g., from CMS)
                className="h-8 w-8 object-contain"
              />
            ) : (
              <span className="font-bold text-xl text-blue-700">BRS</span>
            )}
            <span className="text-lg font-semibold">Baba Ramsurat Smarak Mahavidyalaya</span>
          </Link>
          <p className="text-sm text-gray-600">
            Empowering rural youth with quality education in Arts, Science, and IT.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-sm mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/admissions">Admissions</Link></li>
            <li><Link href="/programs">Programs</Link></li>
            <li><Link href="/lectures">Lectures</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-sm mb-2">Contact</h3>
          <p className="text-xs text-gray-600">📍 Rasoolpur, Mau, Uttar Pradesh - 275301</p>
          <p className="text-xs text-gray-600">✉️ info@brscollege.edu.in</p>
          <p className="text-xs text-gray-600">📞 +91 94xxxxxxxx</p>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="font-semibold text-sm mb-2">Stay Connected</h3>
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" className="text-blue-700 hover:text-blue-900">
              <FaFacebookF size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube" className="text-red-600 hover:text-red-800">
              <FaYoutube size={20} />
            </a>
          </div>
          <form className="flex mt-4">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="px-3 py-1 border border-gray-300 rounded-l text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r text-sm hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-200 text-center text-xs text-gray-600 py-4 px-4">
        © {new Date().getFullYear()} Baba Ramsurat Smarak Mahavidyalaya. All rights reserved.
      </div>

      {/* Back to Top */}
      <a
        href="#top"
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
        aria-label="Scroll to top"
      >
        ↑
      </a>
    </footer>
  );
}
