import type { Metadata, Viewport } from "next";
import { StoreProvider } from "@/lib/store";
import { ThemeWrap } from "@/components/ThemeWrap";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOTEL24 — AI Hotel Operating System",
  description: "Manage every reservation, OTA, room rate, guest message and hotel operation from one simple system—while AI helps increase revenue and reduce manual work. Built for independent Thai properties.",
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
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeWrap>{children}</ThemeWrap>
        </StoreProvider>
      </body>
    </html>
  );
}
