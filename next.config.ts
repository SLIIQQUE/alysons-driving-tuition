import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' wss://generativelanguage.googleapis.com https://generativelanguage.googleapis.com; img-src 'self' https: data:; font-src 'self' data:; style-src 'self' 'unsafe-inline';"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
