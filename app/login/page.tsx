"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BedDouble, LayoutDashboard, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { ModeToggle } from "@/components/ModeToggle";
import { LangToggle } from "@/components/LangToggle";
import type { Role } from "@/lib/model";
import { T } from "@/lib/i18n";

export default function LoginPage() {
  const { login, authed, ready, role: storedRole, switchStatus } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("som@baantalay.com");
  const [password, setPassword] = useState("demo1234");
  const [role, setRole] = useState<Role>("owner");

  useEffect(() => {
    if (!ready || !authed) return;
    if (storedRole === "housekeeping") router.replace("/housekeeping");
    else if (storedRole === "front") router.replace("/front-desk");
    else router.replace(switchStatus === "done" ? "/gm" : "/switch");
  }, [ready, authed, router, storedRole, switchStatus]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login(role);
  }

  return (
    <div className="login-split">
      <section className="login-pane login-hero">
        <header className="login-pane-head">
          <div>
            <div className="login-mark">
              HOTEL24<span />
            </div>
            <span className="login-kicker">Make your hotel AI-bookable</span>
          </div>
          <LangToggle />
        </header>
        <div className="login-pane-body">
          <h1 className="login-headline">
            <T
              en="Connect once. Become bookable by every AI. Take the reservation directly. Own the guest."
              th="เชื่อมครั้งเดียว ให้ทุก AI จองได้ จองตรง โรงแรมเป็นเจ้าของแขก"
            />
          </h1>
          <p className="login-lede">
            <T
              en="Traveler → ChatGPT → HOTEL24 Agent Gateway → this PMS. OTAs stay a channel. We don’t own your guests."
              th="ผู้เดินทาง → ChatGPT → เกตเวย์ HOTEL24 → PMS นี้ OTA ยังเป็นช่องทาง เราไม่ได้เป็นเจ้าของแขกคุณ"
            />
          </p>
        </div>
        <footer className="login-pane-foot">
          <div className="login-stats">
            <div>
              <strong>82%</strong>
              <span><T en="Occupancy tonight" th="เข้าพักคืนนี้" /></span>
            </div>
            <div>
              <strong>฿2,244</strong>
              <span><T en="Best net / night" th="กำไรสุทธิต่อคืนสูงสุด" /></span>
            </div>
            <div>
              <strong>15</strong>
              <span><T en="MCP tools live" th="เครื่องมือ MCP พร้อมใช้" /></span>
            </div>
          </div>
        </footer>
      </section>

      <section className="login-pane login-auth">
        <header className="login-pane-head">
          <div className="login-kicker-ghost"><T en="Sign in" th="เข้าสู่ระบบ" /></div>
          <ModeToggle compact />
        </header>
        <div className="login-pane-body">
          <form className="login-card" onSubmit={onSubmit}>
            <h2><T en="Enter the console" th="เข้าคอนโซล" /></h2>
            <p className="text-muted login-card-note">
              <T en="Demo property: Baan Talay Boutique Resort · switch from Cloudbeds or Little Hotelier in one click." th="ที่พักตัวอย่าง: บ้านทะเล บูทีครีสอร์ต · ย้ายจาก Cloudbeds หรือ Little Hotelier ได้ปุ่มเดียว" />
            </p>
            <div className="login-modes" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <button type="button" className={`login-mode${role === "owner" ? " on" : ""}`} onClick={() => { setRole("owner"); setEmail("som@baantalay.com"); }}>
                <LayoutDashboard size={18} />
                <strong><T en="Owner" th="เจ้าของ" /></strong>
                <span><T en="Switch from Cloudbeds, LINE, rates, profit." th="ย้ายจาก Cloudbeds, LINE, ราคา, กำไร" /></span>
              </button>
              <button type="button" className={`login-mode${role === "front" ? " on" : ""}`} onClick={() => { setRole("front"); setEmail("front@baantalay.com"); }}>
                <BedDouble size={18} />
                <strong><T en="Front desk" th="แผนกต้อนรับ" /></strong>
                <span><T en="Check-in, folio, passport, TM30." th="เช็คอิน โฟลิโอ พาสปอร์ต TM30" /></span>
              </button>
              <button type="button" className={`login-mode${role === "housekeeping" ? " on" : ""}`} onClick={() => { setRole("housekeeping"); setEmail("hk@baantalay.com"); }}>
                <Sparkles size={18} />
                <strong><T en="Housekeeping" th="แม่บ้าน" /></strong>
                <span><T en="Room status board only." th="กระดานสถานะห้อง" /></span>
              </button>
            </div>
            <div className="field">
              <label><T en="Work email" th="อีเมลงาน" /></label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
            </div>
            <div className="field">
              <label><T en="Password" th="รหัสผ่าน" /></label>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              <T en="Enter workspace" th="เข้าพื้นที่ทำงาน" /> <ArrowRight size={18} />
            </button>
          </form>
        </div>
        <footer className="login-pane-foot login-meta">
          <span>SSO · MFA · PDPA</span>
          <span>demo / demo1234 · <a href="/host">Host desk</a></span>
        </footer>
      </section>
    </div>
  );
}
