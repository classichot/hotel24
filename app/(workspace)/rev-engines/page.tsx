"use client";

import Link from "next/link";
import { PageHead, statusCls } from "@/components/PageHead";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { PHASE1_ENGINES, REV_ENGINES } from "@/lib/revenueos";

export default function RevEnginesPage() {
  const later = REV_ENGINES.filter((e) => e.phase === 3 || (e.phase === 2 && !e.n));
  return (
    <div>
      <PageHead
        code="ROS-00 · Phase 1"
        kickerEn="Eight engines first — then Director"
        kickerTh="แปดเครื่องยนต์ก่อน — แล้วค่อยผู้อำนวยการ"
        titleEn="Phase 1 engines"
        titleTh="เครื่องยนต์เฟส 1"
        subEn="These eight calculate. The Director only coordinates. Guardian is engine 08 — a separate agent that can refuse a write. Phase 2 (09–16) is live on its own catalog. Phase 3 sits below so it is not confused with live engines."
        subTh="แปดตัวนี้คำนวณ ผู้อำนวยการประสานอย่างเดียว Guardian คือเครื่อง 08 — เอเจนต์แยกที่ปฏิเสธการเขียนได้ เฟส 2 (09–16) อยู่รายการของตัวเอง เฟส 3 อยู่ด้านล่าง จะได้ไม่สับสนกับเครื่องที่ทำงาน"
      />
      <RevenueNav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Phase 1 engines" th="เครื่องยนต์เฟส 1" /></div>
          <div className="stat-val">8</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Plus" th="บวก" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>Director</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="LLM sets the rate?" th="LLM ตั้งราคาเอง?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Later engines listed" th="เครื่องยนต์รอบหลัง" /></div>
          <div className="stat-val">{later.length}</div>
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
            {PHASE1_ENGINES.map((e) => (
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

      <h5 className="sec-h" style={{ marginTop: 28 }}>
        <T en="Phase 2 is live" th="เฟส 2 ทำงานแล้ว" />
        {" "}
        <Link href="/rev-phase2" className="btn btn-ghost" style={{ marginLeft: 8 }}><T en="Open Phase 2 catalog" th="เปิดรายการเฟส 2" /> →</Link>
      </h5>
      <p className="text-muted" style={{ fontSize: 13, margin: "0 0 20px" }}>
        <T en="Engines 09–16: cancel, overbook, WTP, group, allocation, promo, Direct conversion, attribution. Seeded — not live ML." th="เครื่อง 09–16: ยกเลิก ขายเกิน WTP กรุ๊ป จัดสรร โปร แปลงจองตรง อธิบายรายได้ ข้อมูลจำลอง — ไม่ใช่ ML จริง" />
      </p>

      <h5 className="sec-h"><T en="Not live yet — Phase 3 and supporting signals" th="ยังไม่ทำงาน — เฟส 3 และสัญญาณเสริม" /></h5>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th><T en="Phase" th="เฟส" /></th>
              <th><T en="Engine" th="เครื่องยนต์" /></th>
              <th><T en="Role" th="หน้าที่" /></th>
            </tr>
          </thead>
          <tbody>
            {later.map((e) => (
              <tr key={e.id}>
                <td><span className={statusCls("Pending")}>{e.phase}</span></td>
                <td style={{ fontWeight: 700 }}><T en={e.en} th={e.th} /></td>
                <td className="text-muted" style={{ fontSize: 13 }}><T en={e.does} th={e.doesTh} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
