// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost'], // 👈 this is REQUIRED for Strapi dev images
    },
  };
  
  module.exports = nextConfig;
  