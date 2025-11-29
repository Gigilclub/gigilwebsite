import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Fix the lockfile warning by explicitly setting the root directory
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
