"use client";

import { AgentNav } from "@/components/AgentNav";
import { AgentPlayground } from "@/components/AgentPlayground";
import { PageHead } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function GatewayPage() {
  const { receiveAgentBooking, agentBooks } = useStore();

  return (
    <div>
      <PageHead
        code="AD-02 · Agent Gateway"
        kickerEn="One integration → every AI"
        kickerTh="เชื่อมครั้งเดียว → ทุก AI"
        titleEn="HOTEL24 Agent Gateway"
        titleTh="เกตเวย์เอเจนต์ HOTEL24"
        subEn="ChatGPT, Gemini, Claude and future agents call the same tools. The hotel owner never has to learn ACP, UCP, MCP or JSON-LD."
        subTh="ChatGPT, Gemini, Claude และเอเจนต์ในอนาคตเรียกเครื่องมือชุดเดียวกัน เจ้าของโรงแรมไม่ต้องไปเรียน ACP, UCP, MCP หรือ JSON-LD"
      />
      <AgentNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <T
          en="create_quote() → hold_room() → user confirms → book_room() → this PMS. Booking.com never has to be involved."
          th="create_quote() → hold_room() → ผู้ใช้ยืนยัน → book_room() → PMS นี้ ไม่ต้องมี Booking.com"
        />
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Live tool calls" th="การเรียกเครื่องมือจริง" /></h5>
          <AgentPlayground onBooked={(b) => receiveAgentBooking(b)} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Landed in the PMS" th="เข้า PMS แล้ว" /></h5>
          {agentBooks.length === 0 && (
            <p className="text-muted" style={{ fontSize: 13 }}><T en="No Agent Direct bookings yet this session." th="ยังไม่มีการจองจากเอเจนต์ในรอบนี้" /></p>
          )}
          {agentBooks.map((b) => (
            <div key={String(b.bookingId)} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span>
                <strong>{String(b.bookingId)}</strong>
                <div className="text-muted" style={{ fontSize: 11 }}>{String(b.guest)} · {String(b.hotel)}</div>
              </span>
              <strong>฿{Number(b.total).toLocaleString()}</strong>
            </div>
          ))}
          <p className="text-muted" style={{ fontSize: 12, marginTop: 16 }}>
            POST <code>/api/hap/invoke</code>
          </p>
        </aside>
      </div>
    </div>
  );
}
