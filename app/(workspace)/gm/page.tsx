"use client";

import Link from "next/link";
import { AiActionList } from "@/components/AiActionList";
import { AiNav } from "@/components/AiNav";
import { PageHead } from "@/components/PageHead";
import { AI_ENGINES, actionsFor, highPending, pendingCount } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function GmPage() {
  const { aiState, applyHigh, lang } = useStore();
  const actions = actionsFor("gm");
  const open = pendingCount(aiState, "gm");
  const high = highPending(aiState);

  return (
    <div>
      <PageHead
        code="K-01 · AI General Manager"
        kickerEn="Killer feature · 1 of 7"
        kickerTh="จุดเด่น · 1 จาก 7"
        titleEn="AI General Manager"
        titleTh="GM อัตโนมัติ"
        subEn="Watches the house the way a GM would: overselling, rooms not ready, unpaid arrivals, TM30, stale ARI, cash exceptions, complaints. Proposes. You approve — or autopilot applies the high ones."
        subTh="ดูโรงแรมแบบ GM: ขายเกิน ห้องไม่พร้อม ค้างชำระ TM30 ARI ค้าง เงินสดขาด คำร้องเรียน เสนอมา คุณกดอนุมัติ หรือให้ออโตไพลอตใช้รายการสูง"
        actions={
          open > 0 ? (
            <button className="btn btn-primary" onClick={applyHigh} disabled={!high}>
              <T en={`Approve all high (${high})`} th={`อนุมัติรายการสูงทั้งหมด (${high})`} />
            </button>
          ) : (
            <span className="tag tag-neutral"><T en="House is clear" th="โรงแรมไม่มีรายการค้าง" /></span>
          )
        }
      />
      <AiNav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="GM queue" th="คิว GM" /></div>
          <div className="stat-val" style={{ color: open ? "var(--color-hot-700)" : undefined }}>{open}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="High" th="สูง" /></div>
          <div className="stat-val" style={{ color: high ? "var(--color-hot-700)" : undefined }}>{high}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Engines watching" th="เครื่องยนต์ที่เฝ้า" /></div>
          <div className="stat-val">7</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Authority" th="อำนาจ" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}><T en="No refunds" th="ห้ามคืนเงิน" /></div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Today’s GM actions" th="งาน GM วันนี้" /></h5>
          <AiActionList actions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Other engines" th="เครื่องยนต์อื่น" /></h5>
          {AI_ENGINES.filter((e) => e.id !== "gm").map((e) => {
            const n = pendingCount(aiState, e.id);
            return (
              <Link key={e.id} href={e.href} className="ctx-row" style={{ textDecoration: "none", color: "inherit" }}>
                <span>
                  <strong>{lang === "th" ? e.th : e.en}</strong>
                  <div className="text-muted" style={{ fontSize: 11 }}>{e.n}</div>
                </span>
                <strong style={{ color: n ? "var(--color-hot-700)" : undefined }}>{n}</strong>
              </Link>
            );
          })}
          <div className="callout" style={{ marginTop: 18 }}>
            <T
              en="The GM does not replace Front Desk. It ranks what will hurt tonight and writes into the same store as the calendar, HK, sync and LINE brief."
              th="GM ไม่แทนเคาน์เตอร์ มันเรียงสิ่งที่จะเสียหายคืนนี้ แล้วเขียนลงคลังเดียวกับปฏิทิน แม่บ้าน ซิงก์ และสรุปเช้า LINE"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
