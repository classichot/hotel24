"use client";

import { PageHead } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { PROMO_OPTIONS, REV_DECISIONS } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevPromoPage() {
  const { benefits } = useStore();
  const decisions = REV_DECISIONS.filter((d) => d.id === "ros-promo-c");
  return (
    <div>
      <PageHead
        code="ROS-16 · Engine 14"
        kickerEn="14 · Promotion Optimization Engine"
        kickerTh="14 · เครื่องโปรโมชัน"
        titleEn="Price or demand?"
        titleTh="ราคาหรือดีมานด์?"
        subEn="Monday is a demand / mix problem. 20% off buys occupancy and loses ฿18,200. Option C — breakfast, no cut — wins."
        subTh="วันจันทร์เป็นปัญหาดีมานด์ / ส่วนผสม ลด 20% ซื้อเข้าพักแล้วเสีย ฿18,200 ตัวเลือก C — อาหารเช้า ไม่ตัด — ชนะ"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Option C net" th="สุทธิตัวเลือก C" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-accent-700)" }}>+฿6,400</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="20% off net" th="สุทธิลด 20%" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-hot-700)" }}>−฿18,200</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Breakfast on Direct" th="อาหารเช้าจองตรง" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>{benefits.b1 ? "ON" : "OFF"}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Cut BAR?" th="ตัด BAR?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">14 · <T en="Monday simulation" th="จำลองวันจันทร์" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th><T en="Option" th="ตัวเลือก" /></th>
                  <th className="num">Δ occ</th>
                  <th className="num"><T en="Expected net" th="สุทธิคาด" /></th>
                </tr>
              </thead>
              <tbody>
                {PROMO_OPTIONS.map((o) => (
                  <tr key={o.id} style={{ background: o.pick ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                    <td style={{ fontWeight: 800 }}>{o.id}</td>
                    <td><T en={o.en} th={o.th} /></td>
                    <td className="num">+{o.occ}pp</td>
                    <td className="num" style={{ fontWeight: o.pick ? 800 : 400, color: o.net < 0 ? "var(--color-hot-700)" : "var(--color-accent-700)" }}>
                      {o.net > 0 ? "+" : ""}฿{o.net.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Diagnosis" th="การวินิจฉัย" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="If the problem is PRICE, a discount can win. Monday is DEMAND: mix and visibility. Stay 3 Pay 2 cannibalises the weekend. Ads are slow. Breakfast keeps OTA parity and still moves Direct."
              th="ถ้าปัญหาคือราคา ส่วนลดชนะได้ วันจันทร์คือดีมานด์: ส่วนผสมและการมองเห็น พัก 3 จ่าย 2 กินสุดสัปดาห์ โฆษณาช้า อาหารเช้ารักษาพาร์ตี้ OTA และยังขยับจองตรง"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
