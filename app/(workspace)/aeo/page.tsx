"use client";

import { useEffect, useState } from "react";
import { AgentNav } from "@/components/AgentNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { HAP_ADAPTERS, buildJsonLd } from "@/lib/hap";
import { T } from "@/lib/i18n";

export default function AeoPage() {
  const [origin, setOrigin] = useState("");
  useEffect(() => { setOrigin(window.location.origin); }, []);
  const ld = buildJsonLd("baantalay", origin);

  return (
    <div>
      <PageHead
        code="AD-05 · AEO"
        kickerEn="Agent Engine Optimization"
        kickerTh="ปรับให้เอเจนต์ค้นเจอ"
        titleEn="AEO beside SEO"
        titleTh="AEO คู่กับ SEO"
        subEn="Every HOTEL24 hotel is configured for Google discovery, traditional SEO, AI search (OAI-SearchBot) and agent commerce. The owner does not touch robots.txt."
        subTh="ทุกโรงแรมบน HOTEL24 ถูกตั้งให้ Google หาเจอ SEO ปกติ การค้นของ AI (OAI-SearchBot) และการค้าของเอเจนต์ เจ้าของไม่ต้องไปแตะ robots.txt"
      />
      <AgentNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Adapters HOTEL24 publishes" th="ตัวแปลงที่ HOTEL24 ปล่อย" /></h5>
          {HAP_ADAPTERS.map((a) => (
            <div key={a.id} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span>
                <strong>{a.name}</strong>
                <div className="text-muted" style={{ fontSize: 12 }}>{a.role}</div>
              </span>
              <span className={statusCls(a.status === "live" ? "Verified" : "Pending")}>{a.status}</span>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}>Schema.org JSON-LD</h5>
          <pre className="hap-json">{JSON.stringify(ld, null, 2)}</pre>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="What we auto-write" th="สิ่งที่ระบบเขียนให้" /></h5>
          {[
            { href: "/.well-known/hotel24.json", en: "hotel24.json identity", th: "ตัวตน hotel24.json" },
            { href: "/llms.txt", en: "llms.txt for agents", th: "llms.txt สำหรับเอเจนต์" },
            { href: "/robots.txt", en: "robots.txt · OAI-SearchBot", th: "robots.txt · OAI-SearchBot" },
            { href: "/sitemap.xml", en: "sitemap.xml", th: "sitemap.xml" },
            { href: "/api/hap/registry", en: "AI Hotel Registry", th: "ทะเบียนโรงแรม AI" },
            { href: "/.well-known/mcp.json", en: "MCP well-known", th: "MCP well-known" },
            { href: "/api/hap/feed", en: "ACP-shaped Travel feed", th: "ฟีด Travel แบบ ACP" },
          ].map((l) => (
            <div key={l.href} className="ctx-row">
              <a href={origin + l.href} target="_blank" rel="noreferrer"><T en={l.en} th={l.th} /></a>
            </div>
          ))}
          <div className="callout" style={{ marginTop: 16 }}>
            <T en="OpenAI lists Travel as a merchant category. HOTEL24 maps every property into that shape without the hotel applying to each lab." th="OpenAI มีหมวด Travel สำหรับร้านค้า HOTEL24 ใส่ทุกที่พักในรูปนั้น โดยโรงแรมไม่ต้องไปสมัครทีละแล็บ" />
          </div>
        </aside>
      </div>
    </div>
  );
}
