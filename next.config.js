// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['img.youtube.com', 'localhost','142.93.209.25'],
//   },
//   output: 'standalone',
// };
// module.exports = nextConfig;

// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '142.93.209.25',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  output: 'standalone',
};
module.exports = nextConfig;
