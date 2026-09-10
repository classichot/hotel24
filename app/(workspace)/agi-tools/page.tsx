"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_ACTIONS, AGI_RULES } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiToolsPage() {
  const { agiLevel } = useStore();
  return (
    <div>
      <PageHead
        code="AGI-05 · Hotel Action Tools"
        kickerEn="One API, two scopes"
        kickerTh="API เดียว สองสิทธิ์"
        titleEn="Hotel action tools"
        titleTh="เครื่องมือการกระทำของโรงแรม"
        subEn="Quote, hold, book, propose or publish rates, assign tasks, send approved guest messages. Guest agents shop. Owner agents operate. HOTEL24 validates."
        subTh="ใบราคา กันห้อง จอง เสนอหรือลงราคา มอบงาน ส่งข้อความแขกที่อนุมัติ เอเจนต์แขกช้อป เอเจนต์เจ้าของปฏิบัติการ HOTEL24 ตรวจ"
      />
      <AgiShell>
        <div className="table-wrap" style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr>
                <th><T en="Tool" th="เครื่องมือ" /></th>
                <th><T en="Scope" th="สิทธิ์" /></th>
                <th><T en="Min level" th="ระดับต่ำสุด" /></th>
                <th><T en="Ask first" th="ต้องถาม" /></th>
                <th><T en="Now" th="ตอนนี้" /></th>
              </tr>
            </thead>
            <tbody>
              {AGI_ACTIONS.map((a) => {
                const allowed = agiLevel >= a.minLevel && !a.ask;
                return (
                  <tr key={a.id}>
                    <td>
                      <strong><T en={a.en} th={a.th} /></strong>
                      <div className="text-muted" style={{ fontSize: 11 }}>{a.id}</div>
                    </td>
                    <td>{a.scope}</td>
                    <td>A{a.minLevel}</td>
                    <td>{a.ask ? <T en="Always" th="เสมอ" /> : "—"}</td>
                    <td>{allowed ? <T en="In authority" th="อยู่ในอำนาจ" /> : <T en="Blocked / ask" th="บล็อก / ถาม" />}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-muted" style={{ fontSize: 13, marginTop: 12 }}>
          <T
            en={`Holds expire in ${AGI_RULES.holdMinutes} minutes. Quotes in ${AGI_RULES.quoteMinutes}. Duplicate-booking lock is on. Conflict: only one authorised workflow publishes.`}
            th={`กันห้องหมดอายุ ${AGI_RULES.holdMinutes} นาที ใบราคา ${AGI_RULES.quoteMinutes} มีล็อกกันจองซ้ำ ความขัดแย้ง: มีเวิร์กโฟลว์ที่ได้รับสิทธิ์ลงได้แค่หนึ่ง`}
          />
        </p>
      </AgiShell>
    </div>
  );
}
