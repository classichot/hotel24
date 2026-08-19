"use client";

import { AgentNav } from "@/components/AgentNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { HAP_ADAPTERS, HAP_FLOW, HAP_GRAPH, HAP_TOOLS, HAP_VERSION, RANKING_SIGNALS } from "@/lib/hap";
import { T } from "@/lib/i18n";

export default function HapPage() {
  return (
    <div>
      <PageHead
        code={`AD-06 · Hotel Agent Protocol ${HAP_VERSION}`}
        kickerEn="H24 Agent Ready Standard"
        kickerTh="มาตรฐาน H24 Agent Ready"
        titleEn="Hotel Agent Protocol"
        titleTh="โปรโตคอลเอเจนต์โรงแรม"
        subEn="An open HOTEL24 spec on top of Schema.org, MCP, ACP and UCP — not a replacement for them. Connecting HOTEL24 makes the hotel Agent Ready."
        subTh="สเปกเปิดของ HOTEL24 ที่วางบน Schema.org, MCP, ACP และ UCP — ไม่ได้มาแทน เชื่อม HOTEL24 แล้วโรงแรมพร้อมให้เอเจนต์จอง"
      />
      <AgentNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <T
          en="POST /api/hap/invoke  { tool, arguments }. Aliases: create_quote(), hold_room(), book_room(). CORS is open. Holds write the in-memory hotel graph; the console copies confirmed stays into the PMS."
          th="POST /api/hap/invoke { tool, arguments } นามแฝง: create_quote(), hold_room(), book_room() เปิด CORS Hold เขียนกราฟในหน่วยความจำ คอนโซลคัดลอกการเข้าพักที่ยืนยันแล้วเข้า PMS"
        />
      </div>

      <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Real-time hotel graph" th="กราฟโรงแรมแบบเรียลไทม์" /></h5>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 12 }}>
        <T en="The moat is not the PMS screen. It is this graph, machine-readable, for every connected hotel." th="กำแพงไม่ใช่หน้าจอ PMS แต่เป็นกราฟนี้ ที่เครื่องอ่านได้ สำหรับทุกโรงแรมที่เชื่อม" />
      </p>
      <div className="module-grid" style={{ marginTop: 0 }}>
        {HAP_GRAPH.map((n) => (
          <div key={n} className="module-cell" style={{ minHeight: 0 }}>
            <strong>{n}</strong>
          </div>
        ))}
      </div>

      <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Direct booking flow" th="ลำดับจองตรง" /></h5>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th><T en="Tool" th="เครื่องมือ" /></th>
              <th><T en="What happens" th="เกิดอะไร" /></th>
            </tr>
          </thead>
          <tbody>
            {HAP_FLOW.map((s, i) => (
              <tr key={s.tool}>
                <td>{i + 1}</td>
                <td>
                  <strong>{s.tool}()</strong>
                  <div className="text-muted" style={{ fontSize: 11 }}>{s.alias}</div>
                </td>
                <td><T en={s.en} th={s.th} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Why an agent picks Direct" th="ทำไมเอเจนต์เลือกจองตรง" /></h5>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th><T en="Ranking signal" th="สัญญาณจัดอันดับ" /></th>
            </tr>
          </thead>
          <tbody>
            {RANKING_SIGNALS.map((s) => (
              <tr key={s.id}>
                <td><T en={s.en} th={s.th} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Adapters HOTEL24 publishes" th="ตัวแปลงที่ HOTEL24 ปล่อย" /></h5>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th><T en="Standard" th="มาตรฐาน" /></th>
              <th><T en="Role" th="หน้าที่" /></th>
              <th><T en="Status" th="สถานะ" /></th>
            </tr>
          </thead>
          <tbody>
            {HAP_ADAPTERS.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td>{a.role}</td>
                <td><span className={statusCls(a.status === "live" ? "Verified" : "Pending")}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted" style={{ fontSize: 12, marginTop: 10 }}>
        <T en="ACP and UCP are mapped, not certified. HOTEL24 does not pretend a lab has approved the hotel." th="ACP และ UCP ถูกแมปไว้ ยังไม่ผ่านการรับรอง HOTEL24 ไม่แสร้งว่าแล็บอนุมัติโรงแรมแล้ว" />
      </p>

      <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Callable tools" th="เครื่องมือที่เรียกได้" /></h5>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th><T en="Tool" th="เครื่องมือ" /></th>
              <th><T en="What an agent can do" th="เอเจนต์ทำอะไรได้" /></th>
            </tr>
          </thead>
          <tbody>
            {HAP_TOOLS.map((t) => (
              <tr key={t.name}>
                <td style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{t.name}()</td>
                <td>{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
