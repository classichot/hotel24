import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", "/book/", "/agents", "/api/hap/", "/.well-known/hotel24.json", "/llms.txt"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: ["/", "/book/", "/api/hap/", "/.well-known/hotel24.json"] },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://hotel24-three.vercel.app/sitemap.xml",
  };
}
