"use client";

import Link from "next/link";
import { AgiShell } from "@/components/AgiNav";
import { AgiToggle } from "@/components/AgiToggle";
import { PageHead } from "@/components/PageHead";
import { AGI_LEVELS } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiModePage() {
  const { agiOn, agiPaused, setAgiPaused, agiLevel, setAgiLevel, agiConns } = useStore();
  const live = Object.values(agiConns).filter((s) => s === "live").length;
  const level = AGI_LEVELS.find((l) => l.id === agiLevel) ?? AGI_LEVELS[1];

  return (
    <div>
      <PageHead
        code="AGI-00 · HOTEL24 AGI Mode"
        kickerEn="A separate layer from normal AI"
        kickerTh="ชั้นแยกจาก AI ปกติ"
        titleEn="AGI Mode"
        titleTh="โหมด AGI"
        subEn="Normal AI helps you perform a task inside HOTEL24. AGI Mode lets an authorised external agent receive an objective, work across modules, execute permitted actions, and report. HOTEL24 still calculates and commits."
        subTh="AI ปกติช่วยคุณทำงานใน HOTEL24 โหมด AGI ให้เอเจนต์ภายนอกที่ได้รับสิทธิ์รับวัตถุประสงค์ ทำงานข้ามโมดูล ลงมือในกรอบ แล้วรายงาน HOTEL24 ยังเป็นคนคำนวณและลง"
        actions={<AgiToggle />}
      />
      <AgiShell locked={false}>
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en={agiOn ? "This layer is live." : "This layer is off."} th={agiOn ? "ชั้นนี้เปิดแล้ว" : "ชั้นนี้ปิดอยู่"} /></strong>{" "}
          <T
            en="Recommend / auto on Rates and Autopilot did not change. Agent Direct still books guests. RevenueOS still has L0–L3. AGI Mode is the fourth product layer."
            th="โหมดเสนอ / อัตโนมัติบนราคาและออโตไพลอตไม่เปลี่ยน Agent Direct ยังจองแขก RevenueOS ยังมี L0–L3 โหมด AGI คือชั้นผลิตภัณฑ์ที่สี่"
          />
        </div>

        <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="stat-cell">
            <div className="stat-label"><T en="AGI Mode" th="โหมด AGI" /></div>
            <div className="stat-val" style={{ fontSize: 22, color: agiOn ? "var(--color-accent-700)" : undefined }}>{agiOn ? "On" : "Off"}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Bots live" th="บอทที่ต่อแล้ว" /></div>
            <div className="stat-val">{live}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Autonomy" th="อำนาจ" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>A{agiLevel}</div>
            <div className="stat-hint">{level.en}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Pause / revoke" th="หยุด / เพิกถอน" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>{agiPaused ? "Paused" : "Open"}</div>
          </div>
        </div>

        <div className="split-main">
          <section className="col-pad border-r">
            <h5 className="sec-h"><T en="The distinction" th="ข้อต่าง" /></h5>
            <div className="agi-compare">
              <article>
                <div className="page-kicker"><T en="Normal AI" th="AI ปกติ" /></div>
                <h4><T en="You stay in the chair." th="คุณยังนั่งเก้าอี้" /></h4>
                <p><T en="GM, Autopilot, LINE brief and rate cards propose. You tap Approve. Work stays on that screen." th="GM ออโตไพลอต สรุป LINE และบัตรราคาเสนอ คุณกดอนุมัติ งานอยู่บนหน้านั้น" /></p>
              </article>
              <article>
                <div className="page-kicker"><T en="AGI Mode" th="โหมด AGI" /></div>
                <h4><T en="You delegate an outcome." th="คุณมอบผลลัพธ์" /></h4>
                <p><T en="“Grok, improve next month’s weekday bookings. Keep rates above ฿2,200, spend no more than ฿10,000 on promotion, and ask me before changing cancellation policies.”" th="“Grok เพิ่มการจองกลางสัปดาห์เดือนหน้า ราคาไม่ต่ำกว่า ฿2,200 งบโปรไม่เกิน ฿10,000 และถามก่อนเปลี่ยนนโยบายยกเลิก”" /></p>
              </article>
            </div>
            <h5 className="sec-h" style={{ marginTop: 24 }}><T en="First sales demonstration" th="เดโมขายชุดแรก" /></h5>
            <p>
              <T
                en="Grok manages a revenue mission. A traveller’s ChatGPT requests a package. HOTEL24 validates and confirms the reservation."
                th="Grok ดูแลภารกิจรายได้ ChatGPT ของผู้เดินทางขอแพ็กเกจ HOTEL24 ตรวจแล้วยืนยันการจอง"
              />
            </p>
            <Link href="/agi-demo" className="btn btn-primary"><T en="Open the sales demo" th="เปิดเดโมขาย" /></Link>
          </section>
          <aside className="col-aside">
            <h5 className="sec-h"><T en="Controls" th="ตัวควบคุม" /></h5>
            <div className="seg" style={{ flexWrap: "wrap", marginBottom: 12 }}>
              {AGI_LEVELS.map((l) => (
                <button key={l.id} type="button" className={`seg-opt${agiLevel === l.id ? " on" : ""}`} onClick={() => setAgiLevel(l.id)}>
                  <span>A{l.id}</span>
                </button>
              ))}
            </div>
            <p className="text-muted" style={{ fontSize: 13 }}>{level.hint}</p>
            {agiOn && (
              <button type="button" className="btn btn-secondary btn-block" onClick={() => setAgiPaused(!agiPaused)}>
                {agiPaused ? <T en="Resume AGI Mode" th="ทำงานต่อ" /> : <T en="Pause / revoke agents" th="หยุด / เพิกถอนเอเจนต์" />}
              </button>
            )}
            <div className="callout" style={{ marginTop: 16 }}>
              <T
                en="Seeded connector tests — not a certified Grok, Claude or ChatGPT store listing. An LLM never commits a price. Floor ฿2,200."
                th="ทดสอบคอนเนกเตอร์จำลอง — ยังไม่ใช่ลิสต์ร้าน Grok Claude หรือ ChatGPT ที่รับรอง LLM ห้ามลงราคา ราคาพื้น ฿2,200"
              />
            </div>
          </aside>
        </div>
      </AgiShell>
    </div>
  );
}
