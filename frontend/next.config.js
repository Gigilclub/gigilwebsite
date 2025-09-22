// giftgpt/frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // 👈 REQUIRED: Strapi's port
        pathname: '/uploads/**', // 👈 REQUIRED: Strapi's asset path
      },
      // You can remove the generic HTTPS rule, but it is harmless if kept:
      // { protocol: 'https', hostname: '**' }
    ],
  },
};

module.exports = nextConfig;