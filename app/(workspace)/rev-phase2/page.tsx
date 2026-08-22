"use client";

import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { PHASE2_ENGINES, phase2Writes } from "@/lib/revenueos";

export default function RevPhase2Page() {
  const actions = phase2Writes();
  return (
    <div>
      <PageHead
        code="ROS-10 · Phase 2"
        kickerEn="Autonomous Revenue Manager"
        kickerTh="ผู้จัดการรายได้อัตโนมัติ"
        titleEn="Phase 2 engines"
        titleTh="เครื่องยนต์เฟส 2"
        subEn="Eight more engines so HOTEL24 can operate largely on its own: cancel risk, overbooking, elasticity, groups, allocation, promotions, Direct conversion, attribution. Guardian still refuses a sell limit of 52."
        subTh="อีกแปดเครื่องยนต์ให้ HOTEL24 เดินเองได้เกือบหมด: เสี่ยงยกเลิก ขายเกิน ความยืดหยุ่น กรุ๊ป จัดสรร โปร แปลงจองตรง อธิบายรายได้ Guardian ยังปฏิเสธเพดานขาย 52"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Phase 2 engines" th="เครื่องยนต์เฟส 2" /></div>
          <div className="stat-val">8</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Numbers" th="หมายเลข" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>09–16</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Writes in queue" th="งานเขียนในคิว" /></div>
          <div className="stat-val">{actions.length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="LLM sets sell limit?" th="LLM ตั้งเพดานขาย?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginTop: 8 }}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th><T en="Engine" th="เครื่องยนต์" /></th>
              <th><T en="Calculates" th="คำนวณอะไร" /></th>
              <th><T en="Live output on Baan Talay" th="ผลลัพธ์บนบ้านทะเล" /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {PHASE2_ENGINES.map((e) => (
              <tr key={e.id}>
                <td style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{e.n}</td>
                <td>
                  <strong><T en={e.en} th={e.th} /></strong>
                  <div className="text-muted" style={{ fontSize: 11 }}>{e.brain} brain</div>
                </td>
                <td style={{ fontSize: 13 }}><T en={e.does} th={e.doesTh} /></td>
                <td className="text-muted" style={{ fontSize: 12 }}>{e.output}</td>
                <td>
                  <Link href={e.href} className="btn btn-ghost" style={{ paddingLeft: 0 }}>
                    <T en="Open" th="เปิด" /> →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Phase 2 writes" th="งานเขียนเฟส 2" /></h5>
          <RevDecisionList decisions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="What Phase 2 adds" th="เฟส 2 เพิ่มอะไร" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="Phase 1 said what to charge and where to sell. Phase 2 decides who is likely to cancel, how far to overbook, whether a group is worth the rooms, and why last month moved — then still passes Guardian."
              th="เฟส 1 บอกว่าคิดเท่าไหร่และขายที่ไหน เฟส 2 ตัดสินว่าใครจะยกเลิก ขายเกินได้แค่ไหน กรุ๊ปคุ้มห้องไหม และทำไมเดือนที่แล้วขยับ — แล้วยังผ่าน Guardian"
            />
          </p>
          <Link href="/rev-engines" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="Phase 1 catalog" th="รายการเฟส 1" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
