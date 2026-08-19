"use client";

import { CHANNELS, PROFIT_ROWS, profitNet } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import Link from "next/link";

export default function ProfitPage() {
  const rows = PROFIT_ROWS.map((r) => {
    const net = profitNet(r);
    const cost = r.gross - net;
    return { ...r, net, cost, netAdr: Math.round(net / r.rn), margin: net / r.gross };
  }).sort((a, b) => b.netAdr - a.netAdr);
  const gross = PROFIT_ROWS.reduce((s, r) => s + r.gross, 0);
  const net = rows.reduce((s, r) => s + r.net, 0);
  const otaPaid = rows.filter((r) => r.k !== "direct").reduce((s, r) => s + r.cost, 0);
  const best = rows[0];

  return (
    <div>
      <PageHead
        code="M-04 · OTA Profit Analyzer · MVP"
        kickerEn="Killer feature"
        kickerTh="จุดเด่น"
        titleEn="OTA Profit Analyzer"
        titleTh="กำไรจริงต่อช่องทาง"
        subEn="Gross is not profit. Commission, promotions, payment fees, tax, cancellations and advertising come off first."
        subTh="ยอดขายไม่ใช่กำไร หักค่าคอม โปรโมชัน ค่าธรรมเนียม ภาษี ค่ายกเลิก และค่าโฆษณาออกก่อน"
        actions={<Link href="/direct" className="btn btn-primary"><T en="Open Direct Booking Booster" th="เปิดตัวดันจองตรง" /></Link>}
      />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Gross revenue" th="ยอดขายรวม" /></div>
          <div className="stat-val">{thb(gross, true)}</div>
          <div className="stat-hint"><T en="Aug 2026, 1,194 room-nights" th="ส.ค. 2569 · 1,194 คืน" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Net after cost of sale" th="สุทธิหลังต้นทุนการขาย" /></div>
          <div className="stat-val">{thb(net, true)}</div>
          <div className="stat-hint">{((net / gross) * 100).toFixed(1)}% of gross</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Paid to OTAs" th="จ่ายให้ OTA" /></div>
          <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{thb(otaPaid, true)}</div>
          <div className="stat-hint"><T en="Commission, promos, payment fees" th="ค่าคอม โปรโมชัน ค่าธรรมเนียม" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Best net per room-night" th="สุทธิต่อคืนสูงสุด" /></div>
          <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{thb(best.netAdr)}</div>
          <div className="stat-hint">{best.ch} · {(best.margin * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginTop: 8 }}>
        <table className="table">
          <thead>
            <tr>
              <th><T en="Channel" th="ช่องทาง" /></th>
              <th className="num"><T en="Room-nights" th="คืน" /></th>
              <th className="num"><T en="Gross" th="ยอดขาย" /></th>
              <th className="num"><T en="Commission" th="ค่าคอม" /></th>
              <th className="num"><T en="Promos" th="โปรโมชัน" /></th>
              <th className="num"><T en="Payment" th="ชำระเงิน" /></th>
              <th className="num"><T en="Tax" th="ภาษี" /></th>
              <th className="num"><T en="Cancel" th="ยกเลิก" /></th>
              <th className="num"><T en="Net" th="สุทธิ" /></th>
              <th className="num"><T en="Net / night" th="ต่อคืน" /></th>
              <th className="num"><T en="Margin" th="มาร์จิน" /></th>
            </tr>
          </thead>
          <tbody>
            {PROFIT_ROWS.map((r) => {
              const netR = profitNet(r);
              const hot = r.k === "direct";
              return (
                <tr key={r.ch}>
                  <td style={{ fontWeight: 800, color: hot ? "var(--color-accent-700)" : undefined }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <i style={{ width: 10, height: 10, background: CHANNELS[r.k].ink, display: "inline-block" }} />
                      {r.ch}
                    </span>
                  </td>
                  <td className="num">{r.rn}</td>
                  <td className="num">{thb(r.gross)}</td>
                  <td className="num">{r.comm === 0 ? "฿0" : thb(r.comm)}</td>
                  <td className="num">{thb(r.promo)}</td>
                  <td className="num">{r.pay === 0 ? "฿0" : thb(r.pay)}</td>
                  <td className="num">{thb(r.tax)}</td>
                  <td className="num">{r.cancel === 0 ? "฿0" : thb(r.cancel)}</td>
                  <td className="num">{thb(netR)}</td>
                  <td className="num" style={{ color: hot ? "var(--color-accent-700)" : undefined }}>{thb(Math.round(netR / r.rn))}</td>
                  <td className="num">
                    <div className="bar-track" style={{ width: 72, display: "inline-block", verticalAlign: "middle", marginRight: 8 }}>
                      <div className="bar-fill" style={{ width: `${(netR / r.gross) * 100}%`, background: hot ? "var(--color-accent)" : "var(--color-neutral-800)" }} />
                    </div>
                    {((netR / r.gross) * 100).toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="split-main" style={{ marginTop: 8 }}>
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Cost of sale, highest first" th="ต้นทุนการขาย สูงสุดก่อน" /></h5>
          {[...PROFIT_ROWS].sort((a, b) => (1 - profitNet(a) / a.gross) - (1 - profitNet(b) / b.gross)).map((r) => {
            const m = 1 - profitNet(r) / r.gross;
            return (
              <div key={r.ch} style={{ display: "grid", gridTemplateColumns: "160px 1fr 64px", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <strong>{r.ch}</strong>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${m * 100 / 0.39}%`, maxWidth: "100%", background: CHANNELS[r.k].ink }} /></div>
                <span className="num">{(m * 100).toFixed(1)}%</span>
              </div>
            );
          })}
        </section>
        <aside className="col-aside">
          <div className="callout">
            <strong><T en="Decision" th="ข้อสรุป" /></strong>
            <p style={{ margin: "8px 0 0" }}>
              <T
                en="Agoda sold 1.8× more room-nights than direct, but left ฿751 less profit per night. Shift 15% of OTA volume to HOTEL24 Direct and you keep about ฿40,100 more this month at the same occupancy."
                th="Agoda ขายได้ 1.8 เท่าของการจองตรง แต่เหลือกำไรน้อยกว่าคืนละ ฿751 — ย้ายยอดจาก OTA มาจองตรงเพียง 15% เท่ากับกำไรเพิ่มราว ฿40,100 ต่อเดือน ที่อัตราเข้าพักเดิม"
              />
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
