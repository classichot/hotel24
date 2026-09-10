"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_CONTEXT, AGI_RULES, contrib } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiRevenuePage() {
  const { runAgiMission, approveAgiMission, agiMissions, agiConns, agiLevel } = useStore();
  const st = agiMissions["m-rev"] ?? "draft";
  const from = 2200;
  const proposed = 2200;
  const after = contrib(proposed);
  return (
    <div>
      <PageHead
        code="AGI-W2 · Revenue Autopilot"
        kickerEn="Improve profit within my rules"
        kickerTh="เพิ่มกำไรในกฎของฉัน"
        titleEn="Weekday recovery mission"
        titleTh="ภารกิจกู้กลางสัปดาห์"
        subEn="Grok monitors pace, evaluates options, and stays above ฿2,200. Promo ≤ ฿10,000. Ask before cancellation policy. Optimise contribution after commission and variable cost."
        subTh="Grok เฝ้าจังหวะ ประเมินทางเลือก และอยู่เหนือ ฿2,200 โปรไม่เกิน ฿10,000 ถามก่อนนโยบายยกเลิก เน้นส่วนสมทบหลังคอมและต้นทุนแปร"
        actions={
          <button type="button" className="btn btn-primary" onClick={() => runAgiMission("m-rev")} disabled={agiConns.grok !== "live"}>
            <T en="Assign to Grok" th="มอบให้ Grok" />
          </button>
        }
      />
      <AgiShell>
        <div className="callout" style={{ marginTop: 16 }}>
          <T
            en="Grok wanted −8% (฿2,024). HOTEL24 blocked it. The published proposal is hold BAR at the floor and spend ฿8,000 of the ฿10,000 promo on LINE OA weekday nights — not a public undercut."
            th="Grok อยาก −8% (฿2,024) HOTEL24 บล็อก ข้อเสนอที่เผยแพร่คือค้าง BAR ที่ราคาพื้น แล้วใช้ ฿8,000 จากงบโปร ฿10,000 บน LINE OA คืนกลางสัปดาห์ — ไม่ตัดราคาหน้าเว็บ"
          />
        </div>
        <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="stat-cell">
            <div className="stat-label"><T en="Weekday occ." th="เข้าพักกลางสัปดาห์" /></div>
            <div className="stat-val">{AGI_CONTEXT.occupancy.weekdaySep}%</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Proposed BAR" th="BAR ที่เสนอ" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>฿{proposed.toLocaleString()}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Contribution / night" th="ส่วนสมทบ / คืน" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>฿{after.toLocaleString()}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Promo used" th="โปรที่ใช้" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>฿8,000</div>
          </div>
        </div>
        <ul className="playbook-steps">
          <li><T en={`Floor ฿${AGI_RULES.floorThb.toLocaleString()} · Grok’s ฿2,024 never left the room.`} th={`ราคาพื้น ฿${AGI_RULES.floorThb.toLocaleString()} · ฿2,024 ของ Grok ไม่ออกจากห้อง`} /></li>
          <li><T en="Forecast assumes −1.1 weekday elasticity from 2024. Estimated, not observed." th="พยากรณ์สมมติความยืดหยุ่นกลางสัปดาห์ −1.1 จาก 2024 เป็นประมาณการ ไม่ใช่ผลที่เห็น" /></li>
          <li><T en={`Cancellation policy unchanged. A${agiLevel} ${agiLevel < 2 ? "needs your Approve write." : "may publish the promo only."}`} th={`นโยบายยกเลิกไม่เปลี่ยน A${agiLevel} ${agiLevel < 2 ? "ต้องคุณกดอนุมัติเขียน" : "ลงโปรได้อย่างเดียว"}`} /></li>
        </ul>
        {st === "awaiting" && (
          <button type="button" className="btn btn-primary" onClick={() => approveAgiMission("m-rev")}>
            <T en="Approve Grok’s write" th="อนุมัติงานเขียนของ Grok" />
          </button>
        )}
        <p className="text-muted" style={{ fontSize: 12, marginTop: 12 }}>
          <T en={`From ฿${from.toLocaleString()} — no change to public BAR. Incremental improvement is estimated until weekday pickup is observed.`} th={`จาก ฿${from.toLocaleString()} — BAR หน้าเว็บไม่เปลี่ยน กำไรเพิ่มเป็นประมาณการจนกว่าจะเห็น pickup กลางสัปดาห์`} />
        </p>
      </AgiShell>
    </div>
  );
}
