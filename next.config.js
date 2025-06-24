// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost','img.youtube.com'], // 👈 this is REQUIRED for Strapi dev images
    },
  };
  
  module.exports = nextConfig;
  