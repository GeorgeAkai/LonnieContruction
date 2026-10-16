import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      // Photos uploaded to Vercel Blob storage
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
