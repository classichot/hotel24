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
  const { login, authed, ready } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("som@baantalay.com");
  const [password, setPassword] = useState("demo1234");
  const [role, setRole] = useState<Role>("owner");

  useEffect(() => {
    if (ready && authed) router.replace("/reservations");
  }, [ready, authed, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login(role);
    router.push(role === "housekeeping" ? "/housekeeping" : role === "front" ? "/front-desk" : "/reservations");
  }

  return (
    <div className="login-split">
      <section className="login-pane login-hero">
        <header className="login-pane-head">
          <div>
            <div className="login-mark">
              HOTEL24<span />
            </div>
            <span className="login-kicker">AI Hotel Operating System</span>
          </div>
          <LangToggle />
        </header>
        <div className="login-pane-body">
          <h1 className="login-headline">
            <T
              en="Manage every reservation, OTA, room rate, guest message and hotel operation from one system."
              th="จัดการทุกการจอง ทุก OTA ทุกราคาห้อง ทุกข้อความจากแขก และงานหน้างาน จากระบบเดียว"
            />
          </h1>
          <p className="login-lede">
            <T
              en="Not another booking calendar. Thai localisation, LINE-first operation, AI revenue management and real OTA profitability — for independent properties with 10–80 rooms."
              th="ไม่ใช่แค่ปฏิทินจองห้อง ทำมาสำหรับที่พักอิสระไทย: LINE-first, TM30, AI จัดการรายได้ และกำไรจริงต่อช่องทาง"
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
              <strong>1</strong>
              <span><T en="Shield alert" th="เตือนขายเกิน" /></span>
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
              <T en="Demo property: Baan Talay Boutique Resort, Ao Nang, Krabi · 42 rooms." th="ที่พักตัวอย่าง: บ้านทะเล บูทีครีสอร์ต อ่าวนาง กระบี่ · 42 ห้อง" />
            </p>
            <div className="login-modes" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <button type="button" className={`login-mode${role === "owner" ? " on" : ""}`} onClick={() => { setRole("owner"); setEmail("som@baantalay.com"); }}>
                <LayoutDashboard size={18} />
                <strong><T en="Owner" th="เจ้าของ" /></strong>
                <span><T en="LINE brief, rates, profit, multi-property." th="สรุป LINE ราคา กำไร หลายที่พัก" /></span>
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
          <span>demo / demo1234</span>
        </footer>
      </section>
    </div>
  );
}
