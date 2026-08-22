"use client";

import { useEffect, useState } from "react";
import { T } from "@/lib/i18n";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

function isIosDevice() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function PwaProvider() {
  const [event, setEvent] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem("h24-pwa-dismiss") === "1") return;
    setIos(isIosDevice());
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as InstallEvent);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    if (isIosDevice()) setOpen(true);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!open || isStandalone()) return null;
  if (!event && !ios) return null;

  async function install() {
    if (!event) return;
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") setOpen(false);
    setEvent(null);
  }

  function dismiss() {
    localStorage.setItem("h24-pwa-dismiss", "1");
    setOpen(false);
  }

  return (
    <div className="pwa-banner" role="dialog" aria-label="Install HOTEL24">
      <div>
        <strong><T en="Install HOTEL24" th="ติดตั้ง HOTEL24" /></strong>
        <p>
          {ios
            ? <T en="Share, then Add to Home Screen. Works on iPhone and iPad." th="แชร์ แล้วเลือกเพิ่มไปยังหน้าจอโฮม ใช้ได้บน iPhone และ iPad" />
            : <T en="Add to the phone or tablet. Console and Agent Direct open without the browser chrome." th="เพิ่มลงโทรศัพท์หรือแท็บเล็ต คอนโซลและ Agent Direct เปิดโดยไม่มีแถบเบราว์เซอร์" />}
        </p>
      </div>
      <div className="pwa-banner-actions">
        {event && (
          <button type="button" className="btn btn-primary" onClick={install}>
            <T en="Install" th="ติดตั้ง" />
          </button>
        )}
        <button type="button" className="btn btn-secondary" onClick={dismiss}>
          <T en="Not now" th="ไว้ก่อน" />
        </button>
      </div>
    </div>
  );
}
