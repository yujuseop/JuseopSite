import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/Users/noname/Desktop/project/JuseopSite/my-app/src",
    };
    return config;
  },
};

export default nextConfig;
