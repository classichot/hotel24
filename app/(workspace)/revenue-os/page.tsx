"use client";

import Link from "next/link";
import { PageHead, statusCls } from "@/components/PageHead";
import { RevDecisionList } from "@/components/RevDecisionList";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import {
  MEETING,
  OPPORTUNITIES,
  PHASE1_ENGINES,
  PHASE2_ACTIONS,
  PHASE2_ENGINES,
  REV_AGENTS,
  REV_DECISIONS,
  REV_LEVELS,
  agentName,
  pendingRev,
  revImpact,
} from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevenueOsPage() {
  const { revLevel, setRevLevel, revState, applyRevOpen, revMeetingAt, runRevMeeting } = useStore();
  const open = pendingRev(revState);
  const today = REV_DECISIONS.filter((d) => d.risk !== "blocked");
  const blocked = REV_DECISIONS.filter((d) => d.risk === "blocked");
  const phase2Open = open.filter((d) => (PHASE2_ACTIONS as readonly string[]).includes(d.id));
  const profit = revImpact(revState, "open") || today.reduce((n, d) => n + d.expected, 0);
  const uncaptured = OPPORTUNITIES.reduce((n, o) => n + o.value, 0);
  const level = REV_LEVELS.find((l) => l.id === revLevel) ?? REV_LEVELS[2];

  return (
    <div>
      <PageHead
        code="ROS-01 · RevenueOS"
        kickerEn="Autonomous AI Revenue Team"
        kickerTh="ทีมรายได้ AI อัตโนมัติ"
        titleEn="Revenue Director"
        titleTh="ผู้อำนวยการรายได้"
        subEn="Agents think and explain. Engines calculate. Guardian blocks catastrophe — including Suite ฿500 and sell limit 52. Execution writes rates, inventory, allotment and offers. An LLM never picks ฿4,900 alone."
        subTh="เอเจนต์คิดและอธิบาย เครื่องยนต์คำนวณ Guardian กันหายนะ — รวมสวีท ฿500 และเพดานขาย 52 การลงมือเขียนราคา ห้อง จัดสรร และข้อเสนอ LLM ห้ามเลือก ฿4,900 คนเดียว"
        actions={
          <button className="btn btn-primary" onClick={runRevMeeting}>
            {revMeetingAt
              ? <T en="Meeting recorded" th="ประชุมบันทึกแล้ว" />
              : <T en="Run morning revenue meeting" th="เปิดประชุมรายได้เช้านี้" />}
          </button>
        }
      />
      <RevenueNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <strong><T en="Your revenue team works 24/7." th="ทีมรายได้คุณทำงานตลอด 24 ชม." /></strong>{" "}
        <T
          en={`Good morning. ${open.length} writes are in front of the Director. Estimated incremental profit if approved: ฿${profit.toLocaleString()}. Level 2 is the default.`}
          th={`อรุณสวัสดิ์ มีงานเขียน ${open.length} รายการอยู่หน้าผู้อำนวยการ กำไรเพิ่มถ้าอนุมัติ ฿${profit.toLocaleString()} ระดับ 2 คือค่าเริ่มต้น`}
        />
      </div>

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Actions today" th="งานวันนี้" /></div>
          <div className="stat-val" style={{ color: open.length ? "var(--color-hot-700)" : undefined }}>{open.length}</div>
          <div className="stat-hint">{today.length} <T en="in the plan" th="ในแผน" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Expected profit" th="กำไรที่คาด" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-accent-700)" }}>+฿{profit.toLocaleString()}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Uncaptured (Hunter)" th="ที่ยังไม่เก็บ (นักล่า)" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>฿{uncaptured.toLocaleString()}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Autonomy" th="ระดับอัตโนมัติ" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>L{revLevel}</div>
          <div className="stat-hint">{level.en}</div>
        </div>
      </div>

      <div className="seg" style={{ flexWrap: "wrap", margin: "8px 0 0" }}>
        {REV_LEVELS.map((l) => (
          <button key={l.id} type="button" className={`seg-opt${revLevel === l.id ? " on" : ""}`} onClick={() => setRevLevel(l.id)}>
            <span>{l.en}</span>
          </button>
        ))}
      </div>
      <p className="text-muted" style={{ fontSize: 13, margin: "8px 0 0" }}>
        <T en={level.hint} th={level.hintTh} />
      </p>

      <h5 className="sec-h" style={{ marginTop: 22 }}>
        <T en="Phase 1 — the eight engines that calculate" th="เฟส 1 — แปดเครื่องยนต์ที่คำนวณ" />
        {" "}
        <Link href="/rev-engines" className="btn btn-ghost" style={{ marginLeft: 8 }}><T en="Open catalog" th="เปิดรายการ" /> →</Link>
      </h5>
      <div className="module-grid" style={{ marginTop: 0 }}>
        {PHASE1_ENGINES.map((e) => (
          <Link key={e.id} href={e.href} className="module-cell" style={{ textDecoration: "none", color: "inherit", minHeight: 0 }}>
            <span className="text-muted" style={{ fontSize: 11, fontWeight: 800 }}>{e.n}</span>
            <strong><T en={e.en} th={e.th} /></strong>
            <span>{e.output}</span>
          </Link>
        ))}
      </div>

      <h5 className="sec-h" style={{ marginTop: 22 }}>
        <T en="Phase 2 — cancel, overbook, WTP, group, allocation, promo, Direct, why" th="เฟส 2 — ยกเลิก ขายเกิน WTP กรุ๊ป จัดสรร โปร จองตรง ทำไม" />
        {" "}
        <Link href="/rev-phase2" className="btn btn-ghost" style={{ marginLeft: 8 }}><T en="Open Phase 2" th="เปิดเฟส 2" /> →</Link>
      </h5>
      <div className="module-grid" style={{ marginTop: 0 }}>
        {PHASE2_ENGINES.map((e) => (
          <Link key={e.id} href={e.href} className="module-cell" style={{ textDecoration: "none", color: "inherit", minHeight: 0 }}>
            <span className="text-muted" style={{ fontSize: 11, fontWeight: 800 }}>{e.n}</span>
            <strong><T en={e.en} th={e.th} /></strong>
            <span>{e.output}</span>
          </Link>
        ))}
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">
            <T en={`Director queue · ${phase2Open.length} Phase 2`} th={`คิวผู้อำนวยการ · เฟส 2 ${phase2Open.length}`} />
            {open.length > 0 && revLevel > 0 && (
              <button className="btn btn-primary" style={{ marginLeft: 12 }} onClick={applyRevOpen}>
                <T en="Approve all writes" th="อนุมัติการเขียนทั้งหมด" />
              </button>
            )}
          </h5>
          <RevDecisionList decisions={today} />
          {blocked.map((d) => (
            <div key={d.id} className="callout" style={{ marginTop: 16 }}>
              <span className={statusCls("High")}>guardian</span>{" "}
              <strong><T en={d.head} th={d.headTh} /></strong>
              <p style={{ margin: "8px 0 0", fontSize: 13 }}><T en={d.why} th={d.whyTh} /></p>
            </div>
          ))}
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="AI morning meeting" th="ประชุมรายได้เช้า" /></h5>
          {MEETING.map((m) => (
            <div key={m.agent} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span>
                <strong>{agentName(m.agent)}</strong>
                <div className="text-muted" style={{ fontSize: 12 }}><T en={m.en} th={m.th} /></div>
              </span>
            </div>
          ))}
          <p className="text-muted" style={{ fontSize: 12, marginTop: 12 }}>
            {revMeetingAt
              ? <T en={`Closed ${revMeetingAt}.`} th={`ปิดแล้ว ${revMeetingAt}`} />
              : <T en="Not run this session." th="ยังไม่เปิดในรอบนี้" />}
          </p>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Opportunity Hunter" th="นักล่าโอกาส" /></h5>
          {OPPORTUNITIES.slice(0, 4).map((o) => (
            <div key={o.en} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span className="text-muted" style={{ fontSize: 12 }}><T en={o.en} th={o.th} /></span>
              <strong>฿{o.value.toLocaleString()}</strong>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="The team" th="ทีม" /></h5>
          {REV_AGENTS.filter((a) => a.phase !== 3).map((a) => (
            <div key={a.id} className="ctx-row">
              <span>{a.en}</span>
              <span className="text-muted" style={{ fontSize: 11 }}>{a.human}</span>
            </div>
          ))}
          <Link href="/autopilot" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 16 }}>
            <T en="Classic Autopilot queue" th="คิวออโตไพลอตเดิม" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
