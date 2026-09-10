"use client";

import Link from "next/link";
import { AgiShell } from "@/components/AgiNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { AGI_MISSIONS, botName } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiMissionsPage() {
  const { agiMissions, runAgiMission, approveAgiMission, pauseAgiMission, agiLevel, agiConns } = useStore();

  return (
    <div>
      <PageHead
        code="AGI-04 · Mission Centre"
        kickerEn="Delegate an outcome"
        kickerTh="มอบผลลัพธ์"
        titleEn="Mission Centre"
        titleTh="ศูนย์ภารกิจ"
        subEn="Assign an objective, deadline, budget, success measure and permitted actions. Track progress and what still needs you."
        subTh="กำหนดวัตถุประสงค์ กำหนดส่ง งบ ตัววัดความสำเร็จ และงานที่อนุญาต ติดตามความคืบหน้าและสิ่งที่ยังต้องคุณ"
      />
      <AgiShell>
        {AGI_MISSIONS.map((m) => {
          const st = agiMissions[m.id] ?? "draft";
          return (
            <article key={m.id} className="rec-card">
              <div className="rec-meta">
                <span className={statusCls(st === "done" ? "Complete" : st === "awaiting" || st === "running" ? "Pending" : "Paused")}>{st}</span>
                <span className="tag tag-neutral">{botName(m.bot)}</span>
                <span className="text-muted" style={{ fontSize: 12 }}>{m.deadline}</span>
                {m.budget > 0 && <span className="rec-impact">฿{m.budget.toLocaleString()}</span>}
              </div>
              <h4><T en={m.en} th={m.th} /></h4>
              <p><T en={m.objective} th={m.objectiveTh} /></p>
              <p className="text-muted" style={{ fontSize: 13 }}><T en={m.measure} th={m.measureTh} /></p>
              <p className="text-muted" style={{ fontSize: 12 }}>{m.permitted.join(" · ")}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <button type="button" className="btn btn-primary" onClick={() => runAgiMission(m.id)} disabled={agiConns[m.bot] !== "live"}>
                  <T en="Assign to bot" th="มอบให้บอท" />
                </button>
                {st === "awaiting" && (
                  <button type="button" className="btn btn-primary" onClick={() => approveAgiMission(m.id)}>
                    <T en="Approve write" th="อนุมัติการเขียน" />
                  </button>
                )}
                {(st === "running" || st === "awaiting") && (
                  <button type="button" className="btn btn-secondary" onClick={() => pauseAgiMission(m.id)}>
                    <T en="Pause" th="หยุด" />
                  </button>
                )}
                <Link href={m.href} className="btn btn-ghost"><T en="Open board" th="เปิดกระดาน" /> →</Link>
              </div>
              {agiConns[m.bot] !== "live" && (
                <p className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
                  <T en={`Connect ${botName(m.bot)} first.`} th={`ต่อ ${botName(m.bot)} ก่อน`} />
                </p>
              )}
            </article>
          );
        })}
        <p className="text-muted" style={{ fontSize: 12 }}>
          <T en={`Default autonomy A${agiLevel}. A0 records the mission. A1 waits for Approve write. A2 may execute inside the floor and budget.`} th={`อำนาจเริ่มต้น A${agiLevel} A0 บันทึกภารกิจ A1 รออนุมัติเขียน A2 ลงมือในราคาพื้นและงบได้`} />
        </p>
      </AgiShell>
    </div>
  );
}
