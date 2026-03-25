import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from any source during dev
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
