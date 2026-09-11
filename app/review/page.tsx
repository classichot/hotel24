"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { T } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export default function ReviewEntryPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = token.trim();
    if (!raw) return;
    if (raw.startsWith("http")) window.location.href = raw;
    else router.push(`/review/${encodeURIComponent(raw)}`);
  }

  return (
    <div className="login-split">
      <section className="login-pane login-hero">
        <header className="login-pane-head">
          <div>
            <div className="login-mark">HOTEL24<span /></div>
            <span className="login-kicker"><T en="Review link" th="ลิงก์ตรวจ" /></span>
          </div>
          <LangToggle />
        </header>
        <div className="login-pane-body">
          <h1 className="login-headline"><T en="Open a signed demo URL" th="เปิด URL สาธิตที่เซ็นแล้ว" /></h1>
          <p className="login-lede">
            <T
              en="Guests use the minted /review/{token} from Host desk. The host key stays on the 7L desk — it is not used here."
              th="ผู้รับใช้ /review/{token} จากโต๊ะโฮสต์ คีย์โฮสต์อยู่ที่โต๊ะ 7L — ไม่ใช้ที่นี่"
            />
          </p>
        </div>
        <footer className="login-pane-foot" />
      </section>
      <section className="login-pane login-auth">
        <header className="login-pane-head">
          <div className="login-kicker-ghost"><T en="Review entry" th="ทางเข้าตรวจ" /></div>
          <Link href="/login" className="btn btn-ghost" style={{ fontSize: 12 }}><T en="Public login" th="เข้าสู่ระบบสาธารณะ" /></Link>
        </header>
        <div className="login-pane-body">
          <form className="login-card" onSubmit={onSubmit}>
            <h2><T en="Paste your link" th="วางลิงก์ของคุณ" /></h2>
            <p className="text-muted login-card-note">
              <T en="Baan Talay Boutique Resort console. Full HOTEL24 OS until the signed expiry." th="คอนโซลบ้านทะเล บูทีครีสอร์ต HOTEL24 ทั้งระบบจนกว่าวันหมดอายุที่เซ็นไว้" />
            </p>
            <div className="field">
              <label htmlFor="reviewToken"><T en="Review URL or token" th="URL หรือโทเคนตรวจ" /></label>
              <input className="input" id="reviewToken" value={token} onChange={(e) => setToken(e.target.value)} placeholder="/review/…" />
            </div>
            <button className="btn btn-primary btn-block" type="submit"><T en="Open review" th="เปิดการตรวจ" /></button>
            <p className="text-muted" style={{ fontSize: 12, marginTop: 16 }}>
              <T en="7L hosts mint at" th="7L สร้างลิงก์ที่" />{" "}
              <Link href="/host" style={{ color: "var(--color-accent)" }}><T en="Host desk" th="โต๊ะโฮสต์" /></Link>.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
