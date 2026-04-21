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
  // Spring Boot API 서버로의 직접 프록시
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api-proxy/:path*",
            destination: "http://localhost:8080/api/:path*",
          },
        ]
      : [];
  },
};

export default nextConfig;
