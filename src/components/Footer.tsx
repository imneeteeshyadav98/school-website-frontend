'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchLogo } from '@/lib/strapi';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo().then((url) => setLogoUrl(url));
  }, []);

  return (
    <footer className="w-full border-t bg-gray-50 mt-16 relative text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="BRS College Logo"
                width={36}
                height={36}
                unoptimized
                className="h-9 w-9 object-contain"
              />
            ) : (
              <span className="font-bold text-xl text-blue-700">BRS</span>
            )}
            <span className="font-semibold text-base leading-tight">Baba Ramsurat Smarak College</span>
          </Link>
          <p className="mt-1 text-gray-600 text-xs leading-relaxed">
            Empowering rural youth with quality education in Arts, Science, and IT.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-base mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            {['About', 'Admissions', 'Programs', 'Lectures', 'Gallery'].map((link) => (
              <li key={link}>
                <Link href={`/${link.toLowerCase()}`} className="hover:text-blue-600 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-base mb-2">Contact</h3>
          <p className="text-xs">📍 Rasoolpur, Mau, Uttar Pradesh - 275301</p>
          <p className="text-xs">✉️ info@brscollege.edu.in</p>
          <p className="text-xs">📞 +91 94xxxxxxxx</p>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="font-semibold text-base mb-2">Stay Connected</h3>
          <div className="flex gap-3 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-blue-700 hover:text-blue-900">
              <FaFacebookF size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-red-600 hover:text-red-800">
              <FaYoutube size={20} />
            </a>
          </div>

          <form className="flex w-full max-w-xs">
            <label htmlFor="subscribe" className="sr-only">Subscribe for updates</label>
            <input
              id="subscribe"
              type="email"
              placeholder="Enter your email"
              className="px-3 py-1.5 border border-gray-300 rounded-l-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md text-sm hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gray-100 text-center text-xs text-gray-500 py-4 px-4 border-t">
        © {new Date().getFullYear()} Baba Ramsurat Smarak College. All rights reserved.
      </div>

      {/* Back to Top */}
      <a
        href="#top"
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Scroll to top"
      >
        ↑
      </a>
    </footer>
  );
}
