"use client";

import Link from "next/link";
import { AiActionList } from "@/components/AiActionList";
import { AiNav } from "@/components/AiNav";
import { PageHead } from "@/components/PageHead";
import { ALLOTMENT_SEED, actionsFor, pendingCount } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AutopilotPage() {
  const { aiMode, setAiMode, allotment, aiState, applyEngine } = useStore();
  const actions = actionsFor("autopilot");
  const open = pendingCount(aiState, "autopilot");
  const total = Object.values(allotment).reduce((s, n) => s + n, 0) || 42;

  return (
    <div>
      <PageHead
        code="K-02 · Revenue + Channel Autopilot"
        kickerEn="Killer feature · 2 of 7"
        kickerTh="จุดเด่น · 2 จาก 7"
        titleEn="Revenue + Channel Autopilot"
        titleTh="ออโตไพลอตรายได้และช่องทาง"
        subEn="Not only rates. Min-stay, last-minute, stop-sell and which OTA is allowed to hold the room — ranked by real net, not by who shouts the loudest extranet."
        subTh="ไม่ใช่แค่ราคา ขั้นต่ำ นาทีสุดท้าย ปิดขาย และว่า OTA ไหนกันห้องได้ — เรียงจากกำไรสุทธิจริง ไม่ใช่จากใครตะโกนในเอกซ์ทราเน็ตดังกว่า"
        actions={
          <div className="seg">
            <label className="seg-opt">
              <input type="radio" name="aimode" checked={aiMode === "recommend"} onChange={() => setAiMode("recommend")} />
              <span><T en="Recommend" th="เสนออย่างเดียว" /></span>
            </label>
            <label className="seg-opt">
              <input type="radio" name="aimode" checked={aiMode === "auto"} onChange={() => setAiMode("auto")} />
              <span><T en="Autopilot" th="ออโตไพลอต" /></span>
            </label>
          </div>
        }
      />
      <AiNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <Link href="/revenue-os" style={{ fontWeight: 800 }}><T en="RevenueOS" th="RevenueOS" /></Link>
        {" · "}
        <T en="The commercial department above this queue. Director + five brains + Guardian. This page remains the classic Autopilot writer." th="ฝ่ายพาณิชย์ที่อยู่เหนือคิวนี้ ผู้อำนวยการ + ห้าสมอง + Guardian หน้านี้ยังเป็นตัวเขียนออโตไพลอตเดิม" />
      </div>
      <div className="callout" style={{ marginTop: 8 }}>
        {aiMode === "auto" ? (
          <T en="Autopilot is on. Rate, restriction and allotment writes go through the sync worker, not from this browser to Channex." th="ออโตไพลอตเปิดอยู่ การเขียนราคา ข้อจำกัด และจัดสรรห้องผ่านตัวซิงก์ ไม่ยิงจากเบราว์เซอร์ไป Channex" />
        ) : (
          <T en="Recommend only. Nothing hits ARI until you approve. Agoda still yields ฿751 less net per night than Direct — that is why four Garden rooms are held back." th="เสนออย่างเดียว ยังไม่แตะ ARI จนกว่าคุณจะอนุมัติ Agoda ยังสุทธิต่ำกว่าจองตรง ฿751 ต่อคืน — เลยกัน Garden 4 ห้อง" />
        )}
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">
            <T en="Autopilot queue" th="คิวออโตไพลอต" /> · {open}{" "}
            {open > 0 && aiMode === "recommend" && (
              <button className="btn btn-primary" style={{ marginLeft: 12 }} onClick={() => applyEngine("autopilot")}>
                <T en="Apply all" th="ใช้ทั้งหมด" />
              </button>
            )}
          </h5>
          <AiActionList actions={actions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Garden allotment tonight" th="จัดสรรสวนคืนนี้" /></h5>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
            <T en="Physical rooms stay 14. What changes is which channel may sell them." th="ห้องจริงยัง 14 ที่เปลี่ยนคือช่องทางไหนขายได้" />
          </p>
          {ALLOTMENT_SEED.map((a) => {
            const n = allotment[a.id] ?? a.rooms;
            return (
              <div key={a.id} className="ctx-row" style={{ alignItems: "center" }}>
                <span><T en={a.en} th={a.th} /></span>
                <strong style={{ color: a.id === "direct" ? "var(--color-hot-700)" : undefined }}>{n}</strong>
              </div>
            );
          })}
          <div className="bar-track" style={{ marginTop: 12 }}>
            <div className="bar-fill" style={{ width: `${Math.min(100, ((allotment.direct ?? 14) / total) * 100)}%` }} />
          </div>
          <div className="text-muted" style={{ fontSize: 11, marginTop: 6 }}>
            <T en="Yellow fill = share held for Direct." th="แถบเหลือง = สัดส่วนที่กันให้จองตรง" />
          </div>
          <Link href="/rates" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 16 }}>
            <T en="7-day rate grid" th="ตารางราคา 7 วัน" /> →
          </Link>
          <Link href="/profit" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            <T en="Net per channel" th="สุทธิต่อช่องทาง" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
