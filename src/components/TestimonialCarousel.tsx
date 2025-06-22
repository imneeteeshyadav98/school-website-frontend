'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

type TestimonialItem = {
  name: string;
  message: string;
  role: string;
  photo: string;
  rating: number;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center mb-2" aria-label={`Rated ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, idx) => (
        <svg
          key={idx}
          className={`w-5 h-5 ${
            idx < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.145 3.532a1 1 0 00.95.69h3.708c.969 0 1.371 1.24.588 1.81l-3.004 2.183a1 1 0 00-.364 1.118l1.145 3.532c.3.921-.755 1.688-1.54 1.118l-3.004-2.183a1 1 0 00-1.176 0l-3.004 2.183c-.784.57-1.838-.197-1.539-1.118l1.145-3.532a1 1 0 00-.364-1.118L2.558 8.96c-.783-.57-.38-1.81.588-1.81h3.708a1 1 0 00.95-.69l1.145-3.532z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel({ testimonial = [] }: { testimonial: TestimonialItem[] }) {
  return (
    <section className="text-center px-4 sm:px-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8">What People Say</h3>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonial.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="bg-white rounded-xl shadow-md p-6 mx-4 flex flex-col items-center text-center hover:shadow-lg transition duration-300 h-full"
              role="group"
              aria-label={`Testimonial from ${item.name}`}
            >
              {/* Avatar */}
              {item.photo ? (
                <div className="relative w-20 h-20 mb-4 rounded-full border-2 border-blue-500 overflow-hidden">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    className="object-cover rounded-full"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}

              {/* Quote */}
              <p className="italic text-gray-600 mb-3 line-clamp-4">"{item.message}"</p>

              {/* Ratings */}
              <StarRating rating={item.rating} />

              {/* Name & Role */}
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
