"use client";

import { AgentNav } from "@/components/AgentNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { HAP_HOTELS } from "@/lib/hap";
import { T } from "@/lib/i18n";

export default function RegistryPage() {
  return (
    <div>
      <PageHead
        code="AD-03 · AI Hotel Registry"
        kickerEn="registry.hotel24.com"
        kickerTh="registry.hotel24.com"
        titleEn="HOTEL24 AI Hotel Registry"
        titleTh="ทะเบียนโรงแรมสำหรับ AI"
        subEn="Agents should not scrape the open web at random. They ask HOTEL24 for verified hotels that match the stay. That graph is the moat."
        subTh="เอเจนต์ไม่ควรไปขูดเว็บมั่ว ๆ ให้ถาม HOTEL24 หาโรงแรมที่ยืนยันแล้วและตรงกับการเข้าพัก กราฟนี้คือกำแพง"
      />
      <AgentNav />

      <p className="text-muted" style={{ fontSize: 13, margin: "12px 0 0" }}>
        GET <code>/api/hap/registry?city=Chiang+Mai</code>
      </p>

      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th><T en="Hotel" th="โรงแรม" /></th>
              <th><T en="Place" th="ที่" /></th>
              <th>ID</th>
              <th>Bank</th>
              <th><T en="Property" th="ที่พัก" /></th>
              <th>Direct</th>
              <th>Inv.</th>
              <th>Rates</th>
              <th>Cancel</th>
              <th>AI book</th>
            </tr>
          </thead>
          <tbody>
            {HAP_HOTELS.map((h) => (
              <tr key={h.id}>
                <td style={{ fontFamily: "var(--font-heading)", fontSize: 12 }}>{h.id}</td>
                <td style={{ fontWeight: 700 }}>{h.name}<div className="text-muted" style={{ fontSize: 11 }}>{h.nameTh}</div></td>
                <td>{h.area}, {h.city}</td>
                {(["identity", "bank", "property", "direct", "inventory", "rates", "cancelApi", "aiBooking"] as const).map((k) => (
                  <td key={k}>
                    <span className={statusCls(h.verification[k] ? "Verified" : "Pending")}>{h.verification[k] ? "Yes" : "No"}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="callout" style={{ marginTop: 16 }}>
        <T
          en="Give me verified hotels around Chiang Mai matching these requirements — that query hits this registry, not Agoda’s index."
          th="ขอโรงแรมที่ยืนยันแล้วแถวเชียงใหม่ตามเงื่อนไขนี้ — คำถามนั้นมากระทบทะเบียนนี้ ไม่ใช่ดัชนีของ Agoda"
        />
      </div>
    </div>
  );
}
