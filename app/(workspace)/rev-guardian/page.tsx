"use client";

import { PageHead, statusCls } from "@/components/PageHead";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { FLOOR_RATES, GUARDRAILS, REV_DECISIONS } from "@/lib/revenueos";

export default function RevGuardianPage() {
  const blocked = REV_DECISIONS.filter((d) => d.risk === "blocked");
  return (
    <div>
      <PageHead
        code="ROS-06 · Engine 08"
        kickerEn="08 · Revenue Guardian Engine"
        kickerTh="08 · เครื่องรั้วรายได้"
        titleEn="Revenue Guardian"
        titleTh="ผู้พิทักษ์รายได้"
        subEn="Engine 08 is mandatory if HOTEL24 executes. A separate agent. Pricing AI may draft ฿500. Inventory AI may draft sell 52. Guardian never lets either reach ARI."
        subTh="เครื่อง 08 บังคับถ้า HOTEL24 ลงมือเอง เป็นเอเจนต์แยก Pricing AI อาจร่าง ฿500 Inventory AI อาจร่างเพดาน 52 Guardian ไม่ให้ทั้งคู่ถึง ARI"
      />
      <RevenueNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <T
          en="The LLM does not decide ‘change the room rate to ฿4,900’. It calls engines, then acts inside these rails."
          th="LLM ห้ามตัดสินใจว่า ‘เปลี่ยนราคาเป็น ฿4,900’ มันเรียกเครื่องยนต์ แล้วลงมือในรั้วเหล่านี้"
        />
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Guardrail engine" th="เครื่องรั้ว" /></h5>
          {GUARDRAILS.map((g) => (
            <div key={g.id} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span><T en={g.en} th={g.th} /></span>
              <span className={statusCls("Verified")}>live</span>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Blocked this session" th="ที่บล็อกในรอบนี้" /></h5>
          {blocked.map((d) => (
            <article key={d.id} className="rec-card">
              <div className="rec-meta">
                <span className={statusCls("High")}>blocked</span>
                <span className="text-muted">{d.no}</span>
              </div>
              <h3 style={{ fontSize: 18, margin: "8px 0" }}><T en={d.head} th={d.headTh} /></h3>
              <p className="text-muted" style={{ fontSize: 13 }}><T en={d.why} th={d.whyTh} /></p>
            </article>
          ))}
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Floor rates" th="ราคาพื้น" /></h5>
          {Object.entries(FLOOR_RATES).map(([k, n]) => (
            <div key={k} className="ctx-row">
              <span>{k}</span>
              <strong>฿{n.toLocaleString()}</strong>
            </div>
          ))}
          <p className="text-muted" style={{ fontSize: 12, marginTop: 16 }}>
            <T en="Owner sets floors, brand rules and risk. Guardian enforces them on every write, including Autopilot L2/L3." th="เจ้าของตั้งพื้น กฎแบรนด์ และความเสี่ยง Guardian บังคับทุกการเขียน รวมออโตไพลอต L2/L3" />
          </p>
        </aside>
      </div>
    </div>
  );
}
