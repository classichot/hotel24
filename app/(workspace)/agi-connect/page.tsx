"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { AGI_BOTS } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiConnectPage() {
  const { agiConns, testAgiBot, setAgiConn, propertyId } = useStore();

  return (
    <div>
      <PageHead
        code="AGI-01 · Connect Your Agent"
        kickerEn="Grok first, then Claude, then ChatGPT"
        kickerTh="Grok ก่อน แล้ว Claude แล้ว ChatGPT"
        titleEn="Connect your agent"
        titleTh="ต่อเอเจนต์ของคุณ"
        subEn="Owners work through the assistant they already use. Each bot is a first-class client of the same HOTEL24 API. Permissions stay here."
        subTh="เจ้าของทำงานผ่านผู้ช่วยที่ใช้อยู่ แต่ละบอทเป็นลูกค้าชั้นหนึ่งของ API เดียวกัน สิทธิ์อยู่ที่นี่"
      />
      <AgiShell>
        <p className="text-muted" style={{ fontSize: 13, margin: "16px 0" }}>
          <T en={`Property in scope: ${propertyId}. Responsibilities default to revenue + operations. Guest ChatGPT uses a separate shopping scope.`} th={`โรงแรมในขอบเขต: ${propertyId} ความรับผิดชอบเริ่มต้นคือรายได้ + ปฏิบัติการ ChatGPT ของแขกใช้สิทธิ์ช้อปแยก`} />
        </p>
        {AGI_BOTS.map((b) => {
          const st = agiConns[b.id];
          return (
            <article key={b.id} className="rec-card">
              <div className="rec-meta">
                <span className="tag tag-neutral">#{b.seq}</span>
                <span className={statusCls(st === "live" ? "Live" : st === "testing" ? "Pending" : "Paused")}>{st}</span>
                <span className="text-muted" style={{ fontSize: 12 }}>{b.scope.join(" · ")}</span>
              </div>
              <h4>{b.en}</h4>
              <p><T en={b.approach} th={b.approachTh} /></p>
              <p className="text-muted" style={{ fontSize: 13 }}><T en={`First demo: ${b.demo}`} th={`เดโมแรก: ${b.demoTh}`} /></p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <button type="button" className="btn btn-primary" onClick={() => testAgiBot(b.id)} disabled={st === "testing"}>
                  {st === "live" ? <T en="Re-test connection" th="ทดสอบอีกครั้ง" /> : <T en="Test connection" th="ทดสอบการต่อ" />}
                </button>
                {st === "live" && (
                  <button type="button" className="btn btn-secondary" onClick={() => setAgiConn(b.id, "paused")}>
                    <T en="Pause" th="หยุด" />
                  </button>
                )}
                {st !== "off" && st !== "revoked" && (
                  <button type="button" className="btn btn-ghost" onClick={() => setAgiConn(b.id, "revoked")}>
                    <T en="Revoke" th="เพิกถอน" />
                  </button>
                )}
                <a href={b.docs} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <T en="Provider docs" th="เอกสารผู้ให้บริการ" /> →
                </a>
              </div>
            </article>
          );
        })}
      </AgiShell>
    </div>
  );
}
