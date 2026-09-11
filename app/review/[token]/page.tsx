"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { T } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import {
  formatExpiry,
  hoursLeft,
  readInviteSession,
  saveInviteSession,
  verifyInvite,
  type InvitePayload,
} from "@/lib/invite";

function Shell({ kicker, title, lede, children }: { kicker: string; title: string; lede: string; children: ReactNode }) {
  return (
    <div className="login-split">
      <section className="login-pane login-hero">
        <header className="login-pane-head">
          <div>
            <div className="login-mark">HOTEL24<span /></div>
            <span className="login-kicker">{kicker}</span>
          </div>
          <LangToggle />
        </header>
        <div className="login-pane-body">
          <h1 className="login-headline">{title}</h1>
          <p className="login-lede">{lede}</p>
        </div>
        <footer className="login-pane-foot" />
      </section>
      <section className="login-pane login-auth">
        <header className="login-pane-head">
          <div className="login-kicker-ghost"><T en="Review link" th="ลิงก์ตรวจ" /></div>
          <Link href="/login" className="btn btn-ghost" style={{ fontSize: 12 }}><T en="Public login" th="เข้าสู่ระบบสาธารณะ" /></Link>
        </header>
        <div className="login-pane-body">
          <div className="login-card">{children}</div>
        </div>
      </section>
    </div>
  );
}

export default function ReviewInvitePage() {
  const { token } = useParams<{ token: string }>();
  const { login, ready } = useStore();
  const [state, setState] = useState<"checking" | "ok" | "expired" | "revoked" | "invalid">("checking");
  const [payload, setPayload] = useState<InvitePayload | null>(null);
  const [raw, setRaw] = useState("");

  const rawToken = Array.isArray(token) ? token.join("/") : token || "";

  useEffect(() => {
    if (!ready) return;
    if (rawToken === "ended") {
      setState("expired");
      return;
    }
    let cancelled = false;
    (async () => {
      const result = await verifyInvite(rawToken);
      if (cancelled) return;
      if (result.ok) {
        setPayload(result.payload);
        setRaw(result.token);
        setState("ok");
        return;
      }
      setPayload(result.payload ?? null);
      setState(result.reason);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, rawToken]);

  function enter() {
    if (!payload) return;
    saveInviteSession(payload, raw);
    login("owner", { invite: true });
    window.location.assign("/gm");
  }

  if (!ready || state === "checking") {
    return (
      <Shell kicker="Review link" title="Opening your review…" lede="Checking the time window on this link.">
        <p className="text-muted"><T en="One moment." th="รอสักครู่" /></p>
      </Shell>
    );
  }

  if (state === "expired") {
    const when = payload?.exp ? formatExpiry(payload.exp) : "the end of the review window";
    return (
      <Shell
        kicker="Review link expired"
        title="This link is closed"
        lede="The review window has ended. HOTEL24 on this URL can no longer be opened. Ask 7L Advisory if you need a new link."
      >
        <h2><T en="Access ended" th="สิ้นสุดการเข้าถึง" /></h2>
        <p className="text-muted login-card-note">
          <T en={`This review link stopped working at ${when}.`} th={`ลิงก์ตรวจนี้หยุดทำงานเมื่อ ${when}`} />
        </p>
      </Shell>
    );
  }

  if (state === "revoked") {
    return (
      <Shell
        kicker="Review link withdrawn"
        title="This link was cut off"
        lede="7L Advisory ended this review link before the window ran out."
      >
        <h2><T en="Link disabled" th="ลิงก์ถูกปิด" /></h2>
        <p className="text-muted login-card-note">
          <T en="Ask 7L for a new invite if you still need to look at HOTEL24." th="ขอ 7L ออกลิงก์ใหม่ถ้ายังต้องดู HOTEL24" />
        </p>
      </Shell>
    );
  }

  if (state !== "ok" || !payload) {
    return (
      <Shell
        kicker="Review link"
        title="This link is not valid"
        lede="The URL is incomplete or was copied wrong. Ask 7L Advisory to send the link again."
      >
        <h2><T en="Broken link" th="ลิงก์เสีย" /></h2>
        <p className="text-muted login-card-note">
          <T en="Use the full URL from the message, including everything after /review/." th="ใช้ URL เต็มจากข้อความ รวมทุกอย่างหลัง /review/" />
        </p>
        <p className="text-muted" style={{ fontSize: 12, marginTop: 16 }}>
          <Link href="/host"><T en="Host desk" th="โต๊ะโฮสต์" /></Link> · 7L Advisory only
        </p>
      </Shell>
    );
  }

  const left = hoursLeft(payload.exp);
  const daysLeft = Math.max(1, Math.ceil(left / 24));
  const existing = readInviteSession();

  return (
    <Shell
      kicker="Demo review"
      title="Continue your HOTEL24 review"
      lede={`This link still works until ${formatExpiry(payload.exp)} (about ${daysLeft} day${daysLeft === 1 ? "" : "s"} left). After that it will not open.`}
    >
      <div className="login-kicker" style={{ marginBottom: 8 }}>{payload.label || "Baan Talay Boutique Resort"}</div>
      <h2><T en={existing ? "Welcome back" : "Welcome"} th={existing ? "ยินดีต้อนรับกลับ" : "ยินดีต้อนรับ"} /></h2>
      <p className="text-muted login-card-note">
        <T
          en="You are in a time-limited Baan Talay review. Agent Direct, RevenueOS, AGI Mode and the front desk share this store. HOTEL24 still validates and commits."
          th="คุณอยู่ในช่วงตรวจบ้านทะเลแบบมีเวลา Agent Direct, RevenueOS, โหมด AGI และหน้าเคาน์เตอร์ใช้คลังเดียวกัน HOTEL24 ยังตรวจและลงเอง"
        />
      </p>
      <button className="btn btn-primary btn-block" type="button" onClick={enter}>
        <T en="Enter hotel console" th="เข้าคอนโซลโรงแรม" />
      </button>
    </Shell>
  );
}
