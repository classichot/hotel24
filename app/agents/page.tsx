"use client";

import Link from "next/link";
import { AgentPlayground } from "@/components/AgentPlayground";
import { LangToggle } from "@/components/LangToggle";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgentsPublicPage() {
  const { receiveAgentBooking } = useStore();
  return (
    <div className="landing">
      <nav className="nav landing-nav">
        <Link href="/" className="nav-brand">HOTEL<span>24</span></Link>
        <span className="text-muted" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 800 }}>Agent Direct</span>
        <LangToggle />
        <Link href="/login" className="btn btn-primary"><T en="Hotel console" th="คอนโซลโรงแรม" /></Link>
      </nav>
      <div className="landing-inner" style={{ paddingBottom: 80 }}>
        <section className="landing-hero" style={{ paddingBottom: 32 }}>
          <div className="page-kicker"><T en="Traveler → AI agent → hotel" th="ผู้เดินทาง → เอเจนต์ AI → โรงแรม" /></div>
          <h1>
            <span><T en="Book the hotel." th="จองโรงแรม" /></span>
            <span className="hero-accent"><T en="Not the OTA." th="ไม่ใช่ OTA" /></span>
          </h1>
          <p className="lede-sub">
            <T
              en="This playground calls the live HOTEL24 Agent Gateway. The hotel is the merchant of record. Booking.com is not in the path."
              th="หน้านี้เรียกเกตเวย์เอเจนต์ HOTEL24 จริง โรงแรมเป็นผู้ค้าตามกฎหมาย ไม่มี Booking.com ในเส้นทาง"
            />
          </p>
        </section>
        <AgentPlayground onBooked={(b) => receiveAgentBooking(b)} />
      </div>
    </div>
  );
}
