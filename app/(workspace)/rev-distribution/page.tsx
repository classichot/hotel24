"use client";

import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { RevDecisionList } from "@/components/RevDecisionList";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { CHANNEL_NET, isPhase2Decision, REV_DECISIONS } from "@/lib/revenueos";

export default function RevDistributionPage() {
  const decisions = REV_DECISIONS.filter((d) => d.brain === "distribution" && !isPhase2Decision(d.id));
  return (
    <div>
      <PageHead
        code="ROS-05 · Engine 07"
        kickerEn="07 · Channel Profitability Engine"
        kickerTh="07 · เครื่องกำไรต่อช่องทาง"
        titleEn="Distribution Brain"
        titleTh="สมองช่องทาง"
        subEn="Engine 07 maximises Net ADR after acquisition cost — not advertised ADR."
        subTh="เครื่อง 07 เน้น Net ADR หลังต้นทุนการได้มา — ไม่ใช่ ADR หน้าเว็บ"
      />
      <RevenueNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Channel profitability · Net ADR" th="กำไรช่องทาง · Net ADR" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th className="num">ADR</th>
                  <th className="num">Net ADR</th>
                  <th><T en="Cost" th="ต้นทุน" /></th>
                </tr>
              </thead>
              <tbody>
                {CHANNEL_NET.map((c) => (
                  <tr key={c.ch}>
                    <td style={{ fontWeight: 800, color: c.ch.includes("Direct") ? "var(--color-accent-700)" : undefined }}>{c.ch}</td>
                    <td className="num">฿{c.adr.toLocaleString()}</td>
                    <td className="num" style={{ fontWeight: 800 }}>฿{c.net.toLocaleString()}</td>
                    <td className="text-muted">{c.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="callout" style={{ marginTop: 16 }}>
            <T
              en="Weak demand: open every channel. Compression: close wholesaler / Expedia first. Surge: protect Direct and Agent Direct."
              th="ดีมานด์อ่อน: เปิดทุกช่อง ตลาดบีบ: ปิดโฮลเซลล์ / Expedia ก่อน พุ่ง: กันจองตรงและ Agent Direct"
            />
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Promotion test" th="ทดสอบโปรโมชัน" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="Monday is not a price problem. Option C (no discount + breakfast) beats a 20% cut. Allocation, promo and Direct conversion are Phase 2 engines 13–15."
              th="วันจันทร์ไม่ใช่ปัญหาราคา ตัวเลือก C (ไม่ลด + อาหารเช้า) ชนะการตัด 20% จัดสรร โปร และแปลงจองตรงคือเครื่องเฟส 2 หมายเลข 13–15"
            />
          </p>
          <Link href="/rev-alloc" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="13 Alloc · 14 Promo · 15 Direct" th="13 จัดสรร · 14 โปร · 15 จองตรง" /> →
          </Link>
          <Link href="/agent-offers" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            <T en="AI Direct Offers" th="ข้อเสนอตรงสำหรับ AI" /> →
          </Link>
          <Link href="/profit" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            <T en="OTA profit analyzer" th="เครื่องวิเคราะห์กำไร OTA" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
