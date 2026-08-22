"use client";

import { PageHead, statusCls } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { OVERBOOK_CAP, OVERBOOK_DAYS, PHYSICAL_ROOMS, REV_DECISIONS } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevOverbookPage() {
  const { revSellLimit } = useStore();
  const writes = REV_DECISIONS.filter((d) => d.id === "ros-overbook-fri");
  const blocked = REV_DECISIONS.filter((d) => d.id === "ros-overbook-block");
  const live = revSellLimit["21 Aug"];
  return (
    <div>
      <PageHead
        code="ROS-12 · Engine 10"
        kickerEn="10 · Overbooking Engine"
        kickerTh="10 · เครื่องขายเกินคำนวณ"
        titleEn="Sell limit"
        titleTh="เพดานขาย"
        subEn="Cancel + no-show versus walk-cost. Optimal sell limit. Guardian refuses +10 on a 42-room house."
        subTh="ยกเลิก + no-show เทียบต้นทุนวอล์ก เพดานขายที่เหมาะ Guardian ปฏิเสธ +10 บนบ้าน 42 ห้อง"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Physical rooms" th="ห้องจริง" /></div>
          <div className="stat-val">{PHYSICAL_ROOMS}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Owner cap" th="เพดานเจ้าของ" /></div>
          <div className="stat-val">+{OVERBOOK_CAP}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Friday pick" th="เลือกวันศุกร์" /></div>
          <div className="stat-val">45</div>
          <div className="stat-hint">{live ? <T en={`Written ${live}`} th={`เขียนแล้ว ${live}`} /> : <T en="Not written yet" th="ยังไม่เขียน" />}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Sell 52" th="เพดาน 52" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-hot-700)" }}>BLOCK</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">10 · <T en="Wash versus walk" th="ห้องที่อาจว่างเทียบวอล์ก" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Arrival" th="วันเข้า" /></th>
                  <th className="num"><T en="On books" th="จองแล้ว" /></th>
                  <th className="num"><T en="Wash" th="คาดว่าง" /></th>
                  <th className="num"><T en="Empty ฿" th="ห้องว่าง ฿" /></th>
                  <th className="num"><T en="Walk ฿" th="วอล์ก ฿" /></th>
                  <th className="num"><T en="Sell" th="เพดาน" /></th>
                </tr>
              </thead>
              <tbody>
                {OVERBOOK_DAYS.map((d) => (
                  <tr key={d.date} style={{ background: d.pick ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                    <td style={{ fontWeight: 700 }}>{d.date}</td>
                    <td className="num">{d.confirmed}</td>
                    <td className="num">{d.wash} <span className="text-muted" style={{ fontSize: 11 }}>({d.pCancel}+{d.pNoShow})</span></td>
                    <td className="num">฿{d.empty.toLocaleString()}</td>
                    <td className="num">฿{d.walk.toLocaleString()}</td>
                    <td className="num" style={{ fontWeight: d.pick ? 800 : 400, color: d.pick ? "var(--color-accent-700)" : undefined }}>
                      {revSellLimit[d.date] ?? d.sell}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={writes} />
          {blocked.map((d) => (
            <div key={d.id} className="callout" style={{ marginTop: 16 }}>
              <span className={statusCls("High")}>guardian</span>{" "}
              <strong><T en={d.head} th={d.headTh} /></strong>
              <p style={{ margin: "8px 0 0", fontSize: 13 }}><T en={d.why} th={d.whyTh} /></p>
            </div>
          ))}
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Why 45, not 52" th="ทำไม 45 ไม่ใช่ 52" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="44 already confirmed. Expected wash 3.2. Empty-room cost at ฿2,200 beats walk-cost at a sell limit of 45. +10 rooms is an inventory draft error — Guardian’s +4 cap stops it before ARI."
              th="จองแล้ว 44 คาดว่าง 3.2 ต้นทุนห้องว่าง ฿2,200 ชนะวอล์กที่เพดาน 45 +10 ห้องคือร่างผิด — เพดาน +4 ของ Guardian หยุดก่อน ARI"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
