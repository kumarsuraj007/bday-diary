import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  cacheComponents: true,
  allowedDevOrigins: [
    '192.168.31.252',
    '*.ngrok-free.app',
    '*.ngrok-free.dev',
    '*.ngrok.io',
  ],
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
