"use client";

import Link from "next/link";
import { AiNav } from "@/components/AiNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { actionsFor } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const RULES = [
  { what: "Morning brief · สรุปเช้า", when: "07:00 daily", hot: false },
  { what: "Rooms not ready before arrivals", when: "12:30", hot: false },
  { what: "Overbooking or mapping failure", when: "immediately", hot: true },
  { what: "Unpaid reservation arriving today", when: "09:00 + 15:00", hot: true },
  { what: "AI pricing / allotment", when: "07:00, approve in chat", hot: true },
  { what: "Guest complaint escalated by AI", when: "immediately", hot: true },
  { what: "Cash reconciliation exception", when: "at shift close", hot: false },
];

export default function LinePage() {
  const { aiState, applyAi, applyEngine, lang } = useStore();
  const items = actionsFor("brief");
  const pending = items.filter((a) => (aiState[a.id] ?? "pending") === "pending");

  return (
    <div>
      <PageHead
        code="K-07 · Owner Morning Brief + Action"
        kickerEn="Killer feature · 7 of 7"
        kickerTh="จุดเด่น · 7 จาก 7"
        titleEn="Morning brief with an action button"
        titleTh="สรุปเช้าพร้อมปุ่มอนุมัติ"
        subEn="The owner does not open a computer. Each line on LINE is a decision: approve writes into HOTEL24 — rates, rooms, collections, mapping — the same store the GM uses."
        subTh="เจ้าของไม่ต้องเปิดคอม แต่ละบรรทัดบน LINE คือการตัดสินใจ กดอนุมัติแล้วเขียนลง HOTEL24 — ราคา ห้อง เก็บเงิน mapping — คลังเดียวกับที่ GM ใช้"
        actions={
          pending.length > 0 ? (
            <button className="btn btn-primary" onClick={() => applyEngine("brief")}>
              <T en={`Approve all on this brief (${pending.length})`} th={`อนุมัติทั้งสรุป (${pending.length})`} />
            </button>
          ) : (
            <span className="tag tag-neutral"><T en="Brief cleared" th="สรุปเช้าเคลียร์แล้ว" /></span>
          )
        }
      />
      <AiNav />

      <div className="line-layout">
        <div className="phone">
          <div className="phone-bar">
            <span>07:00</span>
            <span style={{ marginLeft: "auto" }}>LINE · HOTEL24 Owner</span>
          </div>
          <div className="phone-body">
            <div className="phone-msg">
              <div className="phone-kicker">07:00 · สรุปเช้า · Baan Talay</div>
              <p style={{ fontSize: 13, margin: "0 0 10px" }}>
                <T en="Tap a line to apply it. The GM already ranked these." th="แตะบรรทัดเพื่อใช้ GM เรียงความสำคัญมาแล้ว" />
              </p>
              {items.map((a) => {
                const st = aiState[a.id] ?? "pending";
                return (
                  <button
                    key={a.id}
                    type="button"
                    className="phone-row"
                    style={{ width: "100%", textAlign: "left", cursor: st === "pending" ? "pointer" : "default" }}
                    disabled={st !== "pending"}
                    onClick={() => applyAi(a.id)}
                  >
                    <span style={{ color: a.sev === "High" ? "var(--color-hot-700)" : undefined }}>
                      {lang === "th" ? a.headTh : a.head}
                    </span>
                    <strong>
                      {st === "pending" ? (a.impact ?? a.sev) : st === "applied" ? "OK" : "—"}
                    </strong>
                  </button>
                );
              })}
            </div>
            {pending.slice(0, 2).map((a) => (
              <div key={a.id} className="phone-msg">
                <div className="phone-kicker">{a.when} · {a.kind}</div>
                <p style={{ fontSize: 13, margin: "0 0 10px" }}>{lang === "th" ? a.whyTh : a.why}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary" onClick={() => applyAi(a.id)}><T en="Approve" th="อนุมัติ" /></button>
                  <Link href={a.href ?? "/gm"} className="btn btn-secondary"><T en="Open" th="เปิด" /></Link>
                </div>
              </div>
            ))}
            {pending.length === 0 && (
              <div className="phone-msg">
                <div className="phone-kicker">07:12 · HOTEL24</div>
                <p style={{ fontSize: 13, margin: 0 }}>
                  <T en="All brief items applied. Next push at 12:30 if rooms are still blocking arrivals." th="รายการสรุปเช้าใช้ครบแล้ว จะส่งอีก 12:30 ถ้ายังมีห้องขวางแขกเข้า" />
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h5 className="sec-h"><T en="Why the button matters" th="ทำไมต้องมีปุ่ม" /></h5>
          <p>
            <T
              en="A brief without an action is a report. Thai owners already live in LINE. Approving a mapping, a collection and a rate from chat is how the other six engines actually get used."
              th="สรุปที่ไม่มีปุ่มคือรายงาน เจ้าของไทยอยู่ใน LINE อยู่แล้ว การอนุมัติ map การเก็บเงิน และราคาจากแชท คือวิธีที่อีกหกเครื่องยนต์ถูกใช้จริง"
            />
          </p>
          <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Push rules" th="กฎการส่ง" /></h5>
          {RULES.map((r) => (
            <div key={r.what} className="push-row">
              <strong style={{ color: r.hot ? "var(--color-hot-700)" : undefined }}>{r.what}</strong>
              <span className="text-muted">{r.when}</span>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            {pending.map((a) => (
              <div key={a.id} className="ctx-row">
                <span>{lang === "th" ? a.headTh : a.head}</span>
                <span className={statusCls(a.sev)}>{a.sev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
