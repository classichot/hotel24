"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_CONTEXT, contrib } from "@/lib/agi";
import { T } from "@/lib/i18n";

export default function AgiContextPage() {
  const c = AGI_CONTEXT;
  return (
    <div>
      <PageHead
        code="AGI-03 · Live Hotel Context"
        kickerEn="Decisions need a timestamp"
        kickerTh="การตัดสินใจต้องมีเวลา"
        titleEn="Live hotel context"
        titleTh="บริบทโรงแรมสด"
        subEn="Availability, reservations, pace, cancellations, readiness, channel net and variable cost — each with freshness. Stale Agoda is visible."
        subTh="ห้องว่าง การจอง จังหวะ ยกเลิก ความพร้อม สุทธิช่องทาง และต้นทุนแปร — แต่ละรายการมีเวลาความสด Agoda ที่ค้างมองเห็น"
      />
      <AgiShell>
        <p className="text-muted" style={{ margin: "16px 0 8px" }}><T en={`As of ${c.asOf}`} th={`ณ ${c.asOf}`} /></p>
        <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="stat-cell">
            <div className="stat-label"><T en="Today occ." th="เข้าพักวันนี้" /></div>
            <div className="stat-val">{c.occupancy.today}%</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Weekday Sep" th="กลางสัปดาห์ ก.ย." /></div>
            <div className="stat-val" style={{ color: "var(--color-hot-700)" }}>{c.occupancy.weekdaySep}%</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Dirty / OOO" th="สกปรก / ปิดซ่อม" /></div>
            <div className="stat-val">{c.readiness.dirty} / {c.readiness.ooo}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Direct net / night" th="สุทธิจองตรง / คืน" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>฿{c.channels.directNet.toLocaleString()}</div>
          </div>
        </div>
        <div className="table-wrap" style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr>
                <th><T en="Feed" th="ฟีด" /></th>
                <th><T en="Freshness" th="ความสด" /></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(c.freshness).map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td className={k === "channels" ? "hot-cell" : undefined}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 16 }}>{c.pace}</p>
        <p className="text-muted" style={{ fontSize: 13 }}>
          <T
            en={`Contribution on a ฿2,200 garden after 18% commission and ฿${c.costs.variableNight} variable: ฿${contrib(2200).toLocaleString()}. Observed, not an LLM guess.`}
            th={`ส่วนสมทบบนสวน ฿2,200 หลังคอม 18% และต้นทุนแปร ฿${c.costs.variableNight}: ฿${contrib(2200).toLocaleString()} เป็นตัวเลขที่สังเกต ไม่ใช่เดาของ LLM`}
          />
        </p>
      </AgiShell>
    </div>
  );
}
