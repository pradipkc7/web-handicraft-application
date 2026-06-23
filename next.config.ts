import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        port: "8089",
        hostname: "localhost", // which domain
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        port: "8088",
        hostname: "localhost", // which domain
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // which domain
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
