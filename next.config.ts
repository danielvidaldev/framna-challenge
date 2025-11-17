import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export enabled for deployment to any static host
  output: "export",

  // Image optimization disabled (required for static export)
  images: {
    unoptimized: true,
  },

  // Add trailing slashes for better compatibility
  trailingSlash: true,
};

export default nextConfig;
