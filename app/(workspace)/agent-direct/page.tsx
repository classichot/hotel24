"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AgentNav } from "@/components/AgentNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { buildHotel24Json, hotelBySlug } from "@/lib/hap";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const CHECKS = [
  { k: "identity", en: "Identity verified", th: "ยืนยันตัวตนแล้ว" },
  { k: "bank", en: "Bank account verified", th: "ยืนยันบัญชีธนาคาร" },
  { k: "property", en: "Property verified", th: "ยืนยันที่พัก" },
  { k: "direct", en: "Direct booking verified", th: "จองตรงพร้อม" },
  { k: "inventory", en: "Inventory live", th: "ห้องคงเหลือสด" },
  { k: "rates", en: "Rates live", th: "ราคาสด" },
  { k: "cancelApi", en: "Cancellation API supported", th: "มี API ยกเลิก" },
  { k: "aiBooking", en: "AI booking supported", th: "เอเจนต์จองได้" },
] as const;

export default function AgentDirectPage() {
  const { agentReady, setAgentReady } = useStore();
  const hotel = hotelBySlug("baantalay");
  const [origin, setOrigin] = useState("");
  useEffect(() => { setOrigin(window.location.origin); }, []);
  const doc = buildHotel24Json("baantalay", origin);

  return (
    <div>
      <PageHead
        code="AD-01 · HOTEL24 Agent Direct"
        kickerEn="Pillar · AI distribution"
        kickerTh="เสาหลัก · กระจายผ่าน AI"
        titleEn="Agent Direct"
        titleTh="Agent Direct"
        subEn="Connect once. Become bookable by every AI. Take the reservation directly. Own the guest. OTAs stay a channel — they are not the centre."
        subTh="เชื่อมครั้งเดียว ให้ทุก AI จองได้ จองตรง โรงแรมเป็นเจ้าของแขก OTA ยังเป็นช่องทาง — ไม่ใช่ศูนย์กลาง"
        actions={
          <label className="seg-opt">
            <input type="checkbox" checked={agentReady} onChange={() => setAgentReady(!agentReady)} />
            <span>{agentReady ? <T en="AI Agent Ready" th="พร้อมให้เอเจนต์จอง" /> : <T en="Unpublished" th="ยังไม่เผยแพร่" />}</span>
          </label>
        }
      />
      <AgentNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <strong>HOTEL24 Agent Direct</strong>
        {" · "}
        <T en="Not another OTA. Traveler → ChatGPT / Gemini / MCP agent → HOTEL24 Agent Gateway → this PMS → Direct booking." th="ไม่ใช่ OTA อีกตัว ผู้เดินทาง → ChatGPT / Gemini / MCP → เกตเวย์ HOTEL24 → PMS นี้ → จองตรง" />
      </div>

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label">Verified ID</div>
          <div className="stat-val" style={{ fontSize: 18 }}>{hotel.id}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">hotel24.json</div>
          <div className="stat-val" style={{ fontSize: 22 }}>{agentReady ? "Live" : "Draft"}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">MCP tools</div>
          <div className="stat-val">15</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="OTA in the path" th="มี OTA ในเส้นทาง" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="AI identity" th="ตัวตนสำหรับ AI" /></h5>
          <p className="text-muted" style={{ fontSize: 13, marginBottom: 10 }}>
            <code>/.well-known/hotel24.json</code>
            {" · "}
            <T en="HOTEL24 defines this. A hashtag is not enough — agents need rooms, dates, rates, policies and a way to reserve." th="HOTEL24 กำหนดไฟล์นี้ แฮชแท็กไม่พอ เอเจนต์ต้องได้ห้อง วันที่ ราคา นโยบาย และวิธีจอง" />
          </p>
          {origin && (
            <p style={{ fontSize: 13, marginBottom: 12 }}>
              <a href={`${origin}/.well-known/hotel24.json`} target="_blank" rel="noreferrer">{origin}/.well-known/hotel24.json</a>
            </p>
          )}
          <pre className="hap-json">{JSON.stringify(doc, null, 2)}</pre>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h">{hotel.name}</h5>
          {CHECKS.map((c) => (
            <div key={c.k} className="ctx-row">
              <span><T en={c.en} th={c.th} /></span>
              <span className={statusCls(hotel.verification[c.k] ? "Verified" : "Pending")}>
                {hotel.verification[c.k] ? "Yes" : "No"}
              </span>
            </div>
          ))}
          <Link href="/gateway" className="btn btn-primary btn-block" style={{ marginTop: 18 }}>
            <T en="Open Agent Gateway" th="เปิดเกตเวย์เอเจนต์" />
          </Link>
          <Link href="/agents" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 8 }}>
            <T en="Public traveler playground" th="หน้าทดลองของผู้เดินทาง" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
