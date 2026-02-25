import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.simpleviewinc.com" },
      { protocol: "https", hostname: "cdn.crowdriff.com" },
      { protocol: "https", hostname: "www.queenstownnz.co.nz" },
    ],
  },
};

export default nextConfig;
