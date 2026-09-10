"use client";

import { useState } from "react";
import Link from "next/link";
import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_GUEST_NEED, AGI_OFFERS, AGI_RULES } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiDemoPage() {
  const {
    agiOn, setAgiOn, runAgiDemo, resetAgiDemo, agiDemo, agiConns, agiMissions,
    approveAgiMission, holdAgiOffer, confirmAgiGuest, agiHoldId, agiBooking, agiGuestOffer, setAgiGuestOffer,
  } = useStore();
  const [guest, setGuest] = useState("Alex Kim");
  const grokLive = agiConns.grok === "live";
  const gptLive = agiConns.chatgpt === "live";
  const mission = agiMissions["m-rev"] ?? "draft";

  return (
    <div>
      <PageHead
        code="AGI-99 · Sales demonstration"
        kickerEn="Both sides of the new channel"
        kickerTh="สองด้านของช่องทางใหม่"
        titleEn="Grok + ChatGPT in one run"
        titleTh="Grok + ChatGPT ในรอบเดียว"
        subEn="Grok manages a revenue mission. A traveller’s ChatGPT requests a package. HOTEL24 validates and confirms the reservation."
        subTh="Grok ดูแลภารกิจรายได้ ChatGPT ของผู้เดินทางขอแพ็กเกจ HOTEL24 ตรวจแล้วยืนยันการจอง"
        actions={
          <>
            <button type="button" className="btn btn-primary" onClick={runAgiDemo}>
              <T en="Arm the demo" th="ติดอาวุธเดโม" />
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetAgiDemo}>
              <T en="Reset" th="รีเซ็ต" />
            </button>
          </>
        }
      />
      <AgiShell locked={false}>
        {!agiOn && (
          <div className="callout" style={{ marginTop: 16 }}>
            <T en="AGI Mode is off. Arm the demo to turn the layer on, connect Grok and ChatGPT, and start the revenue mission." th="โหมด AGI ปิดอยู่ กดติดอาวุธเดโมเพื่อเปิดชั้นนี้ ต่อ Grok กับ ChatGPT และเริ่มภารกิจรายได้" />
            <div style={{ marginTop: 12 }}>
              <button type="button" className="btn btn-primary" onClick={() => { setAgiOn(true); runAgiDemo(); }}>
                <T en="Turn on and arm" th="เปิดแล้วติดอาวุธ" />
              </button>
            </div>
          </div>
        )}

        <ol className="agi-steps">
          <li className={grokLive ? "done" : ""}>
            <strong>1 · Grok</strong>
            <p><T en="Owner bot live. Review weekday pace. Floor ฿2,200. Promo cap ฿10,000. Do not touch cancellation." th="บอทเจ้าของต่อแล้ว ตรวจจังหวะกลางสัปดาห์ ราคาพื้น ฿2,200 เพดานโปร ฿10,000 ห้ามแตะนโยบายยกเลิก" /></p>
          </li>
          <li className={mission !== "draft" ? "done" : ""}>
            <strong>2 · Revenue mission</strong>
            <p><T en="Grok prepares the write. HOTEL24 already blocked −8% to ฿2,024. Status:" th="Grok ร่างงานเขียน HOTEL24 บล็อก −8% เป็น ฿2,024 แล้ว สถานะ:" /> {mission}</p>
            {mission === "awaiting" && (
              <button type="button" className="btn btn-primary" onClick={() => approveAgiMission("m-rev")}>
                <T en="Approve Grok’s write" th="อนุมัติงานเขียนของ Grok" />
              </button>
            )}
          </li>
          <li className={gptLive ? "done" : ""}>
            <strong>3 · Traveller ChatGPT</strong>
            <p><T en={AGI_GUEST_NEED.ask} th={AGI_GUEST_NEED.askTh} /></p>
          </li>
          <li className={agiHoldId ? "done" : ""}>
            <strong>4 · Quote and hold</strong>
            <p><T en="HOTEL24 returns complete offers. Guest agent holds one. Inventory lock expires in 10 minutes." th="HOTEL24 ส่งข้อเสนอครบ เอเจนต์แขกกันหนึ่งรายการ ล็อกห้องหมดอายุ 10 นาที" /></p>
            <div className="seg" style={{ flexWrap: "wrap", margin: "8px 0" }}>
              {AGI_OFFERS.map((o) => (
                <button key={o.id} type="button" className={`seg-opt${agiGuestOffer === o.id ? " on" : ""}`} onClick={() => setAgiGuestOffer(o.id)}>
                  <span>{o.room} · ฿{o.total.toLocaleString()}</span>
                </button>
              ))}
            </div>
            <button type="button" className="btn btn-secondary" onClick={holdAgiOffer} disabled={!agiOn}>
              <T en="Hold selected offer" th="กันข้อเสนอที่เลือก" />
            </button>
          </li>
          <li className={agiBooking ? "done" : ""}>
            <strong>5 · HOTEL24 confirms</strong>
            <p><T en="Validate price, inventory, duplicate lock, then PromptPay. Commission ฿0." th="ตรวจราคา ห้อง ล็อกกันจองซ้ำ แล้ว PromptPay ค่าคอม ฿0" /></p>
            <div className="field" style={{ maxWidth: 240, margin: "8px 0" }}>
              <label><T en="Guest name" th="ชื่อแขก" /></label>
              <input className="input" value={guest} onChange={(e) => setGuest(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => confirmAgiGuest(guest)} disabled={!agiHoldId}>
              <T en="Confirm reservation" th="ยืนยันการจอง" />
            </button>
          </li>
        </ol>

        {agiBooking && (
          <div className="callout">
            <strong>{String(agiBooking.bookingId)}</strong>
            <p style={{ margin: "8px 0 0" }}>
              {String(agiBooking.guest)} · {String(agiBooking.room)} · ฿{Number(agiBooking.total).toLocaleString()} · <T en="merchant of record: the hotel" th="ผู้ค้าตามกฎหมาย: โรงแรม" />
            </p>
            <p className="text-muted" style={{ fontSize: 12, margin: "8px 0 0" }}>
              <T en={`Rules held: floor ฿${AGI_RULES.floorThb.toLocaleString()}, promo cap ฿${AGI_RULES.promoCapThb.toLocaleString()}, cancel policy untouched. Demo ${agiDemo}.`} th={`กฎที่ยังอยู่: ราคาพื้น ฿${AGI_RULES.floorThb.toLocaleString()} เพดานโปร ฿${AGI_RULES.promoCapThb.toLocaleString()} นโยบายยกเลิกไม่แตะ เดโม ${agiDemo}`} />
            </p>
            <Link href="/reservations" className="btn btn-ghost" style={{ marginTop: 8 }}><T en="See it on Reservations" th="ดูบนปฏิทินการจอง" /> →</Link>
          </div>
        )}
      </AgiShell>
    </div>
  );
}
