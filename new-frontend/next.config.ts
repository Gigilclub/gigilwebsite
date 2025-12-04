import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'gigil-cms-backend.onrender.com',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true
  },
  // Fix the lockfile warning by explicitly setting the root directory
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
