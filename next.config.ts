import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/.well-known/hotel24.json", destination: "/api/hap/identity" },
      { source: "/.well-known/mcp.json", destination: "/api/hap/mcp" },
    ];
  },
};

export default nextConfig;
