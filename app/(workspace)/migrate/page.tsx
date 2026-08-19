"use client";

import Link from "next/link";
import { AiActionList } from "@/components/AiActionList";
import { AiNav } from "@/components/AiNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { MIGRATE_MAPS, actionsFor, pendingCount } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function MigrateAgentPage() {
  const { aiState, applyEngine, switchStatus, switchSource } = useStore();
  const actions = actionsFor("migrate");
  const open = pendingCount(aiState, "migrate");
  const loftOk = (aiState["mg-loft"] ?? "pending") === "applied" || (aiState["gm-loft"] ?? "pending") === "applied";
  const done = switchStatus === "done";

  return (
    <div>
      <PageHead
        code="K-06 · AI Migration Agent"
        kickerEn="Killer feature · 6 of 7"
        kickerTh="จุดเด่น · 6 จาก 7"
        titleEn="AI migration agent"
        titleTh="เอเจนต์ย้ายระบบ"
        subEn="Cloudbeds and Little Hotelier do not arrive clean. The agent proposes room/rate maps, flags duplicate stays and tax splits, then runs the one-button cut-over only when Shield will pass."
        subTh="Cloudbeds กับ Little Hotelier ไม่ได้มาสะอาด เอเจนต์เสนอ map ห้อง/เรท ชี้การจองซ้ำและแยกภาษี แล้วค่อยกดตัดสลับเมื่อ Shield ผ่าน"
        actions={
          done ? (
            <Link href="/reservations" className="btn btn-primary"><T en="Open calendar" th="เปิดปฏิทิน" /></Link>
          ) : (
            <button className="btn btn-primary" onClick={() => applyEngine("migrate")}>
              <T en="Accept maps and cut over" th="รับ map แล้วตัดสลับ" />
            </button>
          )
        }
      />
      <AiNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <strong>{switchSource === "hotelier" ? "Little Hotelier" : "Cloudbeds"}</strong>
        {" · "}
        {done
          ? <T en="Cut over complete. This agent already ran." th="ตัดสลับแล้ว เอเจนต์ชุดนี้ทำงานไปแล้ว" />
          : <T en="Read-only on the old PMS until you approve the maps below." th="อ่านอย่างเดียวบนระบบเดิม จนกว่าคุณจะรับ map ด้านล่าง" />}
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Proposed maps (confidence)" th="map ที่เสนอ (ความมั่นใจ)" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>HOTEL24</th>
                  <th><T en="Source PMS" th="ระบบเดิม" /></th>
                  <th>OTA</th>
                  <th className="num">%</th>
                  <th><T en="State" th="สถานะ" /></th>
                </tr>
              </thead>
              <tbody>
                {MIGRATE_MAPS.map((m) => {
                  const needs = m.state === "Needs accept";
                  const ok = needs ? loftOk : true;
                  return (
                    <tr key={m.hotel24 + m.ota}>
                      <td style={{ fontWeight: 700 }}>{m.hotel24}</td>
                      <td className="text-muted">{m.src}</td>
                      <td>{m.ota}</td>
                      <td className="num">{m.conf}</td>
                      <td>
                        <span className={statusCls(ok ? "Mapped" : "Unmapped")}>
                          {ok ? (needs ? <T en="Accepted" th="รับแล้ว" /> : m.state) : <T en="Needs accept" th="ต้องรับ" />}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Conflicts the agent will close" th="จุดชนที่เอเจนต์จะปิด" /></h5>
          <AiActionList actions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Order" th="ลำดับ" /></h5>
          <ol className="switch-steps">
            {[
              { en: "Accept Family Loft map", th: "รับ map แฟมิลี่ลอฟท์" },
              { en: "Merge duplicate Müller", th: "รวม Müller ที่ซ้ำ" },
              { en: "Tag tax splits for Finance", th: "ติดป้ายแยกภาษีให้การเงิน" },
              { en: "Cut over — HOTEL24 is live", th: "ตัดสลับ — HOTEL24 เป็นระบบจริง" },
            ].map((s, i) => (
              <li key={s.en} className="switch-step">
                <span className="switch-n">{String(i + 1).padStart(2, "0")}</span>
                <span><strong><T en={s.en} th={s.th} /></strong></span>
              </li>
            ))}
          </ol>
          {open > 0 && (
            <button className="btn btn-secondary btn-block" style={{ marginTop: 16 }} onClick={() => applyEngine("migrate")}>
              <T en="Run the whole agent" th="ให้เอเจนต์ทำทั้งชุด" />
            </button>
          )}
          <Link href="/switch" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="Manual one-button switch" th="ปุ่มย้ายแบบทำเอง" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
