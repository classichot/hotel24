import type { Metadata, Viewport } from "next";
import { StoreProvider } from "@/lib/store";
import { ThemeWrap } from "@/components/ThemeWrap";
import { buildJsonLd } from "@/lib/hap";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOTEL24 — Make Your Hotel AI-Bookable",
  description: "Connect once. Be discovered by every AI. Take reservations directly. Own your guest. HOTEL24 is the hotel operating system and AI distribution network for independent hotels.",
  applicationName: "HOTEL24",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#f3f2f2",
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
          <ThemeWrap>{children}</ThemeWrap>
        </StoreProvider>
      </body>
    </html>
  );
}
