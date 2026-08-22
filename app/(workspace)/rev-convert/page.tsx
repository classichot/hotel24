"use client";

import Link from "next/link";
import { PageHead, statusCls } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { CONVERT_SESSIONS, REV_DECISIONS } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevConvertPage() {
  const { revOffers } = useStore();
  const decisions = REV_DECISIONS.filter((d) => d.id === "ros-convert-sydney");
  return (
    <div>
      <PageHead
        code="ROS-17 · Engine 15"
        kickerEn="15 · Direct Conversion Engine"
        kickerTh="15 · เครื่องแปลงจองตรง"
        titleEn="Recover the search"
        titleTh="กู้เซสชันที่ทิ้ง"
        subEn="Abandoned searches get an inclusion — not a cheaper BAR. Feeds Agent Direct. Sydney mobile converts at 71% with free-cancel."
        subTh="เซสชันที่ทิ้งได้สิทธิ์ — ไม่ตัด BAR ต่อเข้า Agent Direct มือถือซิดนีย์แปลง 71% ด้วยยกเลิกฟรี"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label">S-4419</div>
          <div className="stat-val" style={{ fontSize: 22 }}>71%</div>
          <div className="stat-hint">Sydney · mobile · D-18</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Offer sent" th="ส่งข้อเสนอแล้ว" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>{revOffers["S-4419"] ? "YES" : "NO"}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Sessions" th="เซสชัน" /></div>
          <div className="stat-val">{CONVERT_SESSIONS.length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Undercut Agoda?" th="ตัดราคา Agoda?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">15 · <T en="Abandoned / converting sessions" th="เซสชันที่ทิ้ง / ที่กำลังแปลง" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th><T en="Source" th="แหล่ง" /></th>
                  <th><T en="Drop" th="จุดทิ้ง" /></th>
                  <th className="num">P</th>
                  <th><T en="Offer" th="ข้อเสนอ" /></th>
                  <th><T en="Sent" th="ส่งแล้ว" /></th>
                </tr>
              </thead>
              <tbody>
                {CONVERT_SESSIONS.map((s) => (
                  <tr key={s.id} style={{ background: s.id === "S-4419" ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>{s.id}</td>
                    <td>
                      {s.src}
                      <div className="text-muted" style={{ fontSize: 11 }}>{s.room} · {s.dates}</div>
                    </td>
                    <td>{s.drop}</td>
                    <td className="num" style={{ fontWeight: 800 }}>{s.p}%</td>
                    <td><T en={s.offer} th={s.offerTh} /></td>
                    <td><span className={statusCls(revOffers[s.id] ? "Verified" : "Pending")}>{revOffers[s.id] ? "sent" : "queued"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Why not a ฿200 cut" th="ทำไมไม่ตัด ฿200" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="A public BAR cut matches Agoda and breaks parity. Guardian would block it. Free-cancel is an inclusion Agent Direct can attach to one session."
              th="ตัด BAR หน้าเว็บไปเท่า Agoda และพาร์ตี้พัง Guardian จะบล็อก ยกเลิกฟรีคือสิทธิ์ที่ Agent Direct ติดกับเซสชันเดียวได้"
            />
          </p>
          <Link href="/agent-offers" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="AI Direct Offers" th="ข้อเสนอตรงสำหรับ AI" /> →
          </Link>
          <Link href="/gateway" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            <T en="Agent Gateway" th="เกตเวย์เอเจนต์" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
