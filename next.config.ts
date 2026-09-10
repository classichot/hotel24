import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/.well-known/hotel24.json", destination: "/api/hap/identity" },
      { source: "/.well-known/mcp.json", destination: "/api/hap/mcp" },
      { source: "/.well-known/hotel24-agi.json", destination: "/api/agi/identity" },
      { source: "/.well-known/agi-mcp.json", destination: "/api/agi/mcp" },
    ];
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
    ];
  },
};

export default nextConfig;
