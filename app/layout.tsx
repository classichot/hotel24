import type { Metadata, Viewport } from "next";
import { StoreProvider } from "@/lib/store";
import { ThemeWrap } from "@/components/ThemeWrap";
import { PwaProvider } from "@/components/PwaProvider";
import { buildJsonLd } from "@/lib/hap";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOTEL24 — Make Your Hotel AI-Bookable",
  description: "Connect once. Be discovered by every AI. Take reservations directly. Own your guest. HOTEL24 is the hotel operating system and AI distribution network for independent hotels.",
  applicationName: "HOTEL24",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "HOTEL24",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2f2" },
    { media: "(prefers-color-scheme: dark)", color: "#201e1d" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "HOTEL24",
      applicationCategory: "BusinessApplication",
      slogan: "Make your hotel AI-bookable.",
      description:
        "Hotel operating system and AI distribution network. Traveler → ChatGPT / Gemini / MCP agent → HOTEL24 Agent Gateway → hotel PMS → Direct booking. The hotel owns the guest.",
    },
    buildJsonLd("baantalay", "https://hotel24-three.vercel.app"),
  ];
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <StoreProvider>
          <ThemeWrap>
            {children}
            <PwaProvider />
          </ThemeWrap>
        </StoreProvider>
      </body>
    </html>
  );
}
