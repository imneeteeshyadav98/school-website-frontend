'use client';

import React from 'react';

type LocationMapProps = {
  address: string;
};

export default function LocationMap({ address }: LocationMapProps) {
  if (!address) return null;

  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <section className="text-center bg-gray-100 py-10 px-4 sm:px-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h3>

      <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow">
        <iframe
          title="Google Map Embed"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="text-gray-600 mt-4">{address}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <a
          href={directionsURL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition"
        >
          📍 Get Directions
        </a>

        <a
          href="/about"
          className="bg-gray-800 text-white px-6 py-2 rounded-full shadow hover:bg-gray-900 transition"
        >
          🔍 Learn More About Us
        </a>
      </div>
    </section>
  );
}
