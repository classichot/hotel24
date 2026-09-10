import type { MetadataRoute } from "next";
import { HAP_HOTELS } from "@/lib/hap";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://hotel24-three.vercel.app";
  return [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/agents`, changeFrequency: "daily", priority: 0.9 },
    { url: `${origin}/book/baantalay`, changeFrequency: "daily", priority: 0.9 },
    { url: `${origin}/.well-known/hotel24.json`, changeFrequency: "hourly", priority: 0.8 },
    { url: `${origin}/.well-known/hotel24-agi.json`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/llms.txt`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/api/hap/registry`, changeFrequency: "hourly", priority: 0.7 },
    ...HAP_HOTELS.map((h) => ({
      url: `${origin}/.well-known/hotel24.json?slug=${h.slug}`,
      changeFrequency: "hourly" as const,
      priority: 0.6,
    })),
  ];
}
