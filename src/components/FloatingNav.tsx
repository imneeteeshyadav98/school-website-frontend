'use client';

export default function FloatingNav() {
  return (
    <nav className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-md border rounded-full px-4 py-2 flex gap-3 z-40 text-sm sm:hidden overflow-x-auto max-w-full whitespace-nowrap">
      <a href="#about" className="text-blue-600 font-medium">About</a>
      <a href="#vision-mission" className="text-blue-600">Vision</a>
      <a href="#core-values" className="text-blue-600">Values</a>
      <a href="#principal" className="text-blue-600">Principal</a>
      <a href="#timeline" className="text-blue-600">Timeline</a>
      <a href="#campus-tour" className="text-blue-600">Tour</a>
      <a href="#faculty" className="text-blue-600">Faculty</a>
      <a href="#testimonials" className="text-blue-600">Reviews</a>
      <a href="#location" className="text-blue-600">Map</a>
      <a href="/lectures" className="text-blue-600 font-semibold">🎥 Lectures</a>
    </nav>
  );
}
