"use client";

import { PACE, PROFIT_ROWS, PROPERTIES, profitNet } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function DashboardPage() {
  const { aiMode, recState } = useStore();
  const pending = Object.values(recState).filter((s) => !s || s === "pending").length;
  const exceptions = [
    "Expedia oversold Family Loft for tonight — Shield has closed the room type and drafted an upgrade for one guest.",
    "2 reservations arriving today are unpaid · ฿12,400 outstanding.",
    aiMode === "auto"
      ? "AI auto-applied 3 rate changes this morning · +฿18,400 expected."
      : `${Math.max(pending, 1)} AI rate recommendations are waiting for your approval · +฿18,400 expected.`,
    "Front desk cash reconciliation is ฿1,200 short for 18 Aug.",
    "Room 209 aircon complaint escalated at 06:25 — guest has 2 nights left.",
  ];

  return (
    <div>
      <PageHead
        code="M-08 · Owner Dashboard · MVP"
        kickerEn="Occupancy · ADR · RevPAR"
        kickerTh="อัตราเข้าพัก · ADR · RevPAR"
        titleEn="Owner dashboard"
        titleTh="ภาพรวมเจ้าของ"
        subEn="Cash flow and channel performance without sitting at the front desk."
        subTh="ดูกระแสเงินสดและผลงานต่อช่องทาง โดยไม่ต้องนั่งที่เคาน์เตอร์"
        actions={<Link href="/gm" className="btn btn-primary"><T en="Open AI General Manager" th="เปิด GM อัตโนมัติ" /></Link>}
      />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {[
          { l: "Occupancy", lt: "อัตราเข้าพัก", v: "82%", s: "+6.4 pts vs Aug 2025" },
          { l: "ADR", lt: "ADR", v: "฿2,480", s: "+8.1% · rate-led, not volume" },
          { l: "RevPAR", lt: "RevPAR", v: "฿2,034", s: "+15.2%" },
          { l: "Net revenue MTD", lt: "รายได้สุทธิเดือนนี้", v: "฿2.09M", s: "after commission and fees" },
          { l: "Direct share", lt: "สัดส่วนจองตรง", v: "19%", s: "of net · target 30%", hot: true },
        ].map((k) => (
          <div key={k.l} className="stat-cell">
            <div className="stat-label"><T en={k.l} th={k.lt} /></div>
            <div className="stat-val" style={{ color: k.hot ? "var(--color-hot-700)" : undefined }}>{k.v}</div>
            <div className="stat-hint">{k.s}</div>
          </div>
        ))}
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Pace vs last year" th="จังหวะเทียบปีที่แล้ว" /></h5>
          <div className="pace">
            {PACE.map((p) => (
              <div key={p.d} className="pace-col">
                <div className="pace-bars">
                  <div className="pace-last" style={{ height: `${p.last}%` }} />
                  <div className="pace-now" style={{ height: `${p.now}%` }} />
                </div>
                <span>{p.d}</span>
              </div>
            ))}
          </div>
          <div className="dt-legend">
            <span><i className="dt-dot" style={{ background: "var(--color-neutral-400)" }} /><T en="Aug 2025" th="ส.ค. 2568" /></span>
            <span><i className="dt-dot" style={{ background: "var(--color-accent)" }} /><T en="Aug 2026" th="ส.ค. 2569" /></span>
          </div>

          <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Channel mix · net" th="สัดส่วนช่องทาง · สุทธิ" /></h5>
          {PROFIT_ROWS.map((r) => {
            const net = profitNet(r);
            return (
              <div key={r.ch} style={{ display: "grid", gridTemplateColumns: "160px 1fr auto auto", gap: 10, alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--color-divider)", fontSize: 13 }}>
                <strong style={{ color: r.k === "direct" ? "var(--color-hot-700)" : undefined }}>{r.ch}</strong>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${(r.gross / 1046000) * 100}%` }} /></div>
                <span className="num text-muted">{thb(r.gross, true)}</span>
                <span className="num">{thb(net, true)}</span>
              </div>
            );
          })}
        </section>
        <aside className="col-aside">
          <div>
            <h5 className="sec-h" style={{ color: "var(--color-hot-700)" }}><T en="Exceptions" th="รายการที่ต้องดู" /></h5>
            {exceptions.map((e) => (
              <div key={e} className="stack-row" style={{ fontSize: 13, padding: "10px 0", borderBottom: "1px solid var(--color-divider)" }}>{e}</div>
            ))}
          </div>
          <div>
            <h5 className="sec-h"><T en="Multi-property" th="หลายที่พัก" /></h5>
            {PROPERTIES.map((p) => (
              <div key={p.id} className="prop-row">
                <strong>{p.name}</strong>
                <span className="text-muted">{p.rooms} rooms · {p.occ}% · ADR {thb(p.adr)} · direct {p.direct}%</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
