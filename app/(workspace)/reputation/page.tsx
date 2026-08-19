"use client";

import { AiActionList } from "@/components/AiActionList";
import { AiNav } from "@/components/AiNav";
import { PageHead } from "@/components/PageHead";
import { REVIEWS, actionsFor, pendingCount } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function ReputationPage() {
  const { aiState, applyEngine, lang } = useStore();
  const actions = actionsFor("reputation");
  const open = pendingCount(aiState, "reputation");

  return (
    <div>
      <PageHead
        code="K-05 · AI Reputation → Operations"
        kickerEn="Killer feature · 5 of 7"
        kickerTh="จุดเด่น · 5 จาก 7"
        titleEn="Reputation into operations"
        titleTh="รีวิวกลายเป็นงานหน้างาน"
        subEn="A 2-star Google review is not a marketing problem. It is a room, a breakfast shift, or a vacuum after 21:00. The engine extracts the defect and opens the ticket."
        subTh="รีวิว Google 2 ดาวไม่ใช่ปัญหาการตลาด เป็นห้อง กะอาหารเช้า หรือเครื่องดูดฝุ่นหลัง 21:00 เครื่องยนต์ดึงจุดเสีย แล้วเปิดงาน"
        actions={
          open > 0 ? (
            <button className="btn btn-primary" onClick={() => applyEngine("reputation")}>
              <T en="Open all ops tickets" th="เปิดงานปฏิบัติการทั้งหมด" />
            </button>
          ) : (
            <span className="tag tag-neutral"><T en="Tickets opened" th="เปิดงานแล้ว" /></span>
          )
        }
      />
      <AiNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Reviews in the last 48 hours" th="รีวิว 48 ชั่วโมงล่าสุด" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Source" th="แหล่ง" /></th>
                  <th className="num">★</th>
                  <th><T en="Guest" th="แขก" /></th>
                  <th><T en="Extract" th="ดึงประเด็น" /></th>
                </tr>
              </thead>
              <tbody>
                {REVIEWS.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 700 }}>{r.src}</td>
                    <td className="num" style={{ color: r.score <= 3 ? "var(--color-hot-700)" : undefined }}>{r.score}</td>
                    <td>{r.guest}<div className="text-muted" style={{ fontSize: 11 }}>{r.when}</div></td>
                    <td>
                      <strong>{r.topic}</strong>
                      <div className="text-muted" style={{ fontSize: 12 }}>{lang === "th" ? r.th : r.en}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Ops the engine will open" th="งานที่เครื่องยนต์จะเปิด" /></h5>
          <AiActionList actions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Do not" th="ห้าม" /></h5>
          <p>
            <T
              en="Do not buy the score. Do not refund in public. Fix the room, staff the breakfast, write the HK rule — then reply what changed."
              th="ห้ามซื้อคะแนน ห้ามคืนเงินในที่สาธารณะ แก้ห้อง จัดคนอาหารเช้า เขียนกฎแม่บ้าน — แล้วค่อยตอบว่าเปลี่ยนอะไร"
            />
          </p>
          <Link href="/housekeeping" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="Housekeeping board" th="กระดานแม่บ้าน" /> →
          </Link>
          <Link href="/inbox" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            <T en="Guest thread 209" th="เธรดแขกห้อง 209" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
