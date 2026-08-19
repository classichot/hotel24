"use client";

import { AiActionList } from "@/components/AiActionList";
import { AiNav } from "@/components/AiNav";
import { PageHead } from "@/components/PageHead";
import { RECON_GRID, actionsFor, pendingCount } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function ReconcileAiPage() {
  const { aiState, applyEngine, tripActual, reconcile } = useStore();
  const actions = actionsFor("recon");
  const open = pendingCount(aiState, "recon");
  const tripOk = tripActual === 3 || reconcile === "resolved";

  return (
    <div>
      <PageHead
        code="K-04 · AI OTA Reconciliation"
        kickerEn="Killer feature · 4 of 7"
        kickerTh="จุดเด่น · 4 จาก 7"
        titleEn="AI OTA reconciliation"
        titleTh="กระทบยอด OTA ด้วย AI"
        subEn="Every few hours: HOTEL24 vs each OTA. Mismatch, duplicate, stale ARI, failed import. Auto-resync. Alert only if it cannot close."
        subTh="ทุกไม่กี่ชั่วโมง: HOTEL24 เทียบแต่ละ OTA ความไม่ตรง จองซ้ำ ARI ค้าง นำเข้าล้ม ซิงก์อัตโนมัติ เตือนเมื่อปิดเองไม่ได้"
        actions={
          open > 0 ? (
            <button className="btn btn-primary" onClick={() => applyEngine("recon")}>
              <T en="Run all fixes" th="แก้ทั้งหมด" />
            </button>
          ) : (
            <span className="tag tag-neutral"><T en="In balance" th="ตรงกันแล้ว" /></span>
          )
        }
      />
      <AiNav />

      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>OTA</th>
              <th><T en="Date" th="วันที่" /></th>
              <th><T en="Type" th="ห้อง" /></th>
              <th className="num">HOTEL24</th>
              <th className="num"><T en="Remote" th="ฝั่ง OTA" /></th>
              <th><T en="State" th="สถานะ" /></th>
            </tr>
          </thead>
          <tbody>
            {RECON_GRID.map((r) => {
              const remote = r.ota === "Trip.com" ? (tripOk ? 3 : r.remote) : r.remote;
              const ok = r.ota === "Trip.com" ? tripOk : r.ok;
              return (
                <tr key={r.ota + r.date + r.type}>
                  <td style={{ fontWeight: 700 }}>{r.ota}</td>
                  <td>{r.date}</td>
                  <td>{r.type}</td>
                  <td className="num">{r.hotel24}</td>
                  <td className="num" style={{ color: ok ? undefined : "var(--color-hot-700)" }}>{remote}</td>
                  <td>{ok ? <T en="Match" th="ตรง" /> : <T en="Mismatch" th="ไม่ตรง" />}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="What AI will do" th="สิ่งที่ AI จะทำ" /></h5>
          <AiActionList actions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Rule" th="กฎ" /></h5>
          <p>
            <T
              en="HOTEL24 is the system of record. Remote OTAs are forced to the master, never the other way around — except a genuine NEW reservation, which lands here first then fans out."
              th="HOTEL24 เป็นต้นฉบับ OTA ถูกบังคับให้ตามต้นฉบับ ไม่กลับทาง — ยกเว้นจองใหม่อัน genuine ซึ่งเข้าที่นี่ก่อน แล้วค่อยกระจายออก"
            />
          </p>
          <Link href="/sync" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="Open sync queue" th="เปิดคิวซิงก์" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
