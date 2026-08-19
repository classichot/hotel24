import { buildJsonLd } from "@/lib/hap";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  const ld = buildJsonLd("baantalay", "https://hotel24-three.vercel.app");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {children}
    </>
  );
}
