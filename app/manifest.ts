import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "HOTEL24",
    short_name: "HOTEL24",
    description: "Hotel operating system and AI distribution. Traveler → agent → hotel. The hotel owns the guest.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#f3f2f2",
    theme_color: "#cf1b17",
    lang: "en",
    dir: "ltr",
    categories: ["business", "travel"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Hotel console", short_name: "Console", url: "/login", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Agent Direct", short_name: "Agents", url: "/agents", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Book Baan Talay", short_name: "Book", url: "/book/baantalay", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
