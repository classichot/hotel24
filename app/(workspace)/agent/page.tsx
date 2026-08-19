"use client";

import { AiActionList } from "@/components/AiActionList";
import { AiNav } from "@/components/AiNav";
import { PageHead } from "@/components/PageHead";
import { THREADS } from "@/lib/model";
import { actionsFor, pendingCount } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

const RULES = [
  { en: "Check-in time, transfers, breakfast, crib, late checkout", th: "เวลเช็คอิน รถรับ อาหารเช้า เตียงเด็ก เช็คเอาท์สาย", ok: true },
  { en: "Create / modify / cancel a reservation from an OTA event", th: "สร้าง แก้ ยกเลิกการจองจากเหตุ OTA", ok: true },
  { en: "Reply in the guest’s language, log in Thai for staff", th: "ตอบภาษาแขก บันทึกเป็นไทยให้พนักงาน", ok: true },
  { en: "Refunds, compensation, rate exceptions", th: "คืนเงิน ชดเชย ยกเว้นราคา", ok: false },
];

export default function AgentPage() {
  const { aiState, applyEngine } = useStore();
  const actions = actionsFor("agent");
  const open = pendingCount(aiState, "agent");

  return (
    <div>
      <PageHead
        code="K-03 · AI Reservation / Guest Agent"
        kickerEn="Killer feature · 3 of 7"
        kickerTh="จุดเด่น · 3 จาก 7"
        titleEn="Reservation and guest agent"
        titleTh="เอเจนต์จองและแขก"
        subEn="Not a chatbot sitting on the inbox. It can create, modify and cancel stays, hold a clean room for 11:00, add a transfer to the folio — and it still escalates refunds."
        subTh="ไม่ใช่แชทบอทบนกล่องข้อความ มันสร้าง แก้ ยกเลิกการเข้าพัก กันห้องสะอาดไว้ 11:00 ใส่รถรับที่โฟลิโอ — และยังส่งเรื่องคืนเงินต่อคน"
        actions={
          open > 0 ? (
            <button className="btn btn-primary" onClick={() => applyEngine("agent")}>
              <T en={`Execute ${open} allowed`} th={`ทำ ${open} รายการที่อนุญาต`} />
            </button>
          ) : (
            <span className="tag tag-neutral"><T en="Queue clear" th="คิวว่าง" /></span>
          )
        }
      />
      <AiNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Work the agent can finish" th="งานที่เอเจนต์ทำให้จบได้" /></h5>
          <AiActionList actions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Authority" th="ขอบเขตอำนาจ" /></h5>
          {RULES.map((r) => (
            <div key={r.en} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span><T en={r.en} th={r.th} /></span>
              <strong style={{ color: r.ok ? undefined : "var(--color-hot-700)" }}>{r.ok ? "Yes" : "No"}</strong>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Live threads" th="เธรดที่เปิด" /></h5>
          {THREADS.slice(0, 4).map((t) => (
            <div key={t.id} className="ctx-row">
              <span>{t.name}<div className="text-muted" style={{ fontSize: 11 }}>{t.channel}</div></span>
              <strong>{t.state}</strong>
            </div>
          ))}
          <Link href="/inbox" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="Open guest inbox" th="เปิดกล่องข้อความแขก" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
