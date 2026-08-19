"use client";

import { RECS_SEED } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const BRIEF = [
  { th: "แขกเข้า / ออกวันนี้", en: "Arrivals / departures today", v: "9 / 6", hot: false },
  { th: "อัตราเข้าพักคืนนี้", en: "Occupancy tonight", v: "88% (37/42)", hot: false },
  { th: "รายได้เมื่อวาน (สุทธิ)", en: "Yesterday revenue (net)", v: "฿86,400 (฿71,900)", hot: false },
  { th: "ยอดค้างชำระ 2 การจอง", en: "Unpaid · 2 reservations", v: "฿12,400", hot: true },
  { th: "ห้องยังไม่พร้อมขาย", en: "Rooms not ready", v: "4 ห้อง", hot: true },
  { th: "เงินสดหน้าเคาน์เตอร์ขาด", en: "Cash short at front desk", v: "−฿1,200", hot: true },
  { th: "คำร้องเรียนสำคัญ", en: "Important complaint", v: "ห้อง 209 แอร์", hot: true },
];

const RULES = [
  { what: "Morning brief · สรุปเช้า", when: "07:00 daily", hot: false },
  { what: "Rooms not ready before arrivals", when: "12:30", hot: false },
  { what: "Overbooking or mapping failure", when: "immediately", hot: true },
  { what: "Unpaid reservation arriving today", when: "09:00 + 15:00", hot: true },
  { what: "AI pricing recommendations", when: "07:00, approve in chat", hot: true },
  { what: "Guest complaint escalated by AI", when: "immediately", hot: true },
  { what: "Cash reconciliation exception", when: "at shift close", hot: false },
];

export default function LinePage() {
  const { recState, applyRec, aiMode } = useStore();
  const rec = RECS_SEED[0];
  const st = recState[rec.id] ?? "pending";

  return (
    <div>
      <PageHead
        code="M-09 · Owner Mode on LINE · MVP"
        kickerEn="LINE-first"
        kickerTh="LINE มาก่อน"
        titleEn="Owner mode on LINE"
        titleTh="โหมดเจ้าของบน LINE"
        subEn="The owner does not have to open a computer. Morning brief and exceptions arrive with approve buttons."
        subTh="เจ้าของไม่ต้องเปิดคอม — สรุปเช้าและเหตุผิดปกติส่งเข้า LINE พร้อมปุ่มอนุมัติ"
      />

      <div className="line-layout">
        <div className="phone">
          <div className="phone-bar">
            <span>09:12</span>
            <span style={{ marginLeft: "auto" }}>LINE · HOTEL24 Owner</span>
          </div>
          <div className="phone-body">
            <div className="phone-msg">
              <div className="phone-kicker">07:00 · สรุปเช้า · Baan Talay</div>
              {BRIEF.map((b) => (
                <div key={b.en} className="phone-row">
                  <span>{b.th}</span>
                  <strong style={{ color: b.hot ? "var(--color-hot-700)" : undefined }}>{b.v}</strong>
                </div>
              ))}
            </div>
            <div className="phone-msg">
              <div className="phone-kicker">07:02 · AI Revenue</div>
              <p style={{ fontSize: 13, margin: "0 0 10px" }}>{rec.whyTh}</p>
              <div className="rec-rate" style={{ fontSize: 16 }}>
                <span>{rec.from}</span><span>→</span><strong>{rec.to}</strong>
              </div>
              {st === "pending" && aiMode !== "auto" ? (
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button className="btn btn-primary" onClick={() => applyRec(rec.id)}><T en="Approve" th="อนุมัติ" /></button>
                  <button className="btn btn-secondary"><T en="Skip" th="ข้าม" /></button>
                </div>
              ) : (
                <span className="tag tag-accent" style={{ marginTop: 10 }}><T en="Approved · pushed to 6 channels" th="อนุมัติแล้ว · ดัน 6 ช่องทาง" /></span>
              )}
            </div>
            <div className="phone-msg">
              <div className="phone-kicker">06:25 · Escalation</div>
              <p style={{ fontSize: 13, margin: 0 }}><T en="Room 209 aircon — guest asked for a move or partial refund. AI did not answer. Duty manager notified." th="ห้อง 209 แอร์ไม่เย็น แขกขอย้ายหรือคืนเงินบางส่วน AI ไม่ตอบ ส่งหัวหน้ากะแล้ว" /></p>
            </div>
          </div>
        </div>

        <div>
          <h5 className="sec-h"><T en="Why LINE first" th="ทำไมต้อง LINE ก่อน" /></h5>
          <p>
            <T
              en="Thai owners already run their properties through LINE. Approving a rate change from a chat thread is a smaller ask than logging into a dashboard — so the AI's recommendations actually get used."
              th="เจ้าของโรงแรมไทยสั่งงานผ่าน LINE อยู่แล้ว การกดอนุมัติราคาจากแชทง่ายกว่าการเข้าแดชบอร์ด — คำแนะนำของ AI จึงถูกใช้จริง"
            />
          </p>
          <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Push rules" th="กฎการส่ง" /></h5>
          {RULES.map((r) => (
            <div key={r.what} className="push-row">
              <strong style={{ color: r.hot ? "var(--color-hot-700)" : undefined }}>{r.what}</strong>
              <span className="text-muted">{r.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
