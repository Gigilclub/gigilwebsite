/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Rule for local development environment (keep this)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Rule for your live Strapi backend on Render (add this)
      {
        protocol: 'https',
        hostname: 'gigil-cms-backend.onrender.com',
        port: '', // Default port for HTTPS
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;