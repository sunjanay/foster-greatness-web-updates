import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-v2.circle.so',
      },
      {
        protocol: 'https',
        hostname: 'media.beehiiv.com',
      },
      {
        protocol: 'https',
        hostname: 'beehiiv-images-production.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
