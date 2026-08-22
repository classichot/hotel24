"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { statusCls } from "@/components/PageHead";
import { gmHighQueue, gmQueue } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const SNOOZE_KEY = "h24-gm-later";
const OS_NOTI_KEY = "h24-gm-os-noti";

function laterSet() {
  return sessionStorage.getItem(SNOOZE_KEY) === "1";
}

export function GmNotify() {
  const path = usePathname();
  const { aiState, applyAi, dismissAi, lang, role } = useStore();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [canNotify, setCanNotify] = useState(false);

  const high = useMemo(() => gmHighQueue(aiState), [aiState]);
  const all = useMemo(() => gmQueue(aiState), [aiState]);
  const item = high[0];
  const onDesk = path === "/gm";
  const isGm = role === "owner";

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || !isGm) return;
    if (onDesk || high.length === 0) {
      setOpen(false);
      return;
    }
    if (laterSet()) return;
    setOpen(true);
  }, [ready, isGm, onDesk, high.length]);

  useEffect(() => {
    if (!ready || !isGm || high.length === 0) return;
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    if (sessionStorage.getItem(OS_NOTI_KEY) === "1") return;
    sessionStorage.setItem(OS_NOTI_KEY, "1");
    const first = high[0];
    const body = lang === "th"
      ? `${high.length} รายการสูงรอ GM · ${first.headTh}`
      : `${high.length} high items need GM · ${first.head}`;
    try {
      new Notification("HOTEL24 · GM", { body, icon: "/icons/icon-192.png", tag: "hotel24-gm" });
    } catch {
      /* ignored — Safari private / denied */
    }
  }, [ready, isGm, high, lang]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") later();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function later() {
    sessionStorage.setItem(SNOOZE_KEY, "1");
    setOpen(false);
  }

  function reopen() {
    sessionStorage.removeItem(SNOOZE_KEY);
    setOpen(true);
  }

  function approveOne() {
    if (!item) return;
    applyAi(item.id);
  }

  function dismissOne() {
    if (!item) return;
    dismissAi(item.id);
  }

  function approveAllGmHigh() {
    high.forEach((a) => applyAi(a.id));
  }

  async function enableDeviceNoti() {
    if (typeof Notification === "undefined") return;
    const perm = await Notification.requestPermission();
    setCanNotify(perm === "granted");
    if (perm === "granted" && high[0]) {
      sessionStorage.removeItem(OS_NOTI_KEY);
    }
  }

  if (!isGm) return null;

  return (
    <>
      {!open && all.length > 0 && !onDesk && (
        <button type="button" className="gm-dock no-print" onClick={reopen}>
          <span className="gm-dock-n">{high.length || all.length}</span>
          <span>
            <strong><T en="GM approval" th="รอ GM อนุมัติ" /></strong>
            <em>
              {high.length > 0
                ? <T en={`${high.length} high · tap to approve`} th={`${high.length} สูง · แตะเพื่ออนุมัติ`} />
                : <T en={`${all.length} on the GM desk`} th={`${all.length} รายการบนโต๊ะ GM`} />}
            </em>
          </span>
        </button>
      )}

      {open && item && (
        <>
          <div className="gm-scrim no-print" onClick={later} />
          <div className="gm-pop no-print" role="dialog" aria-modal="true" aria-labelledby="gm-pop-title">
            <div className="gm-pop-kicker">
              <span><T en="AI General Manager" th="GM อัตโนมัติ" /></span>
              <span><T en={`${high.length} high waiting`} th={`${high.length} รายการสูงรอ`} /></span>
            </div>
            <div className="rec-meta">
              <span className={statusCls(item.sev)}>{item.sev}</span>
              <span className="tag tag-neutral"><T en={item.kind} th={item.kindTh} /></span>
              <span className="text-muted" style={{ fontSize: 12 }}>{item.when}</span>
              {item.impact && <span className="rec-impact">{item.impact}</span>}
            </div>
            <h3 id="gm-pop-title"><T en={item.head} th={item.headTh} /></h3>
            <p><T en={item.why} th={item.whyTh} /></p>
            <p className="text-muted" style={{ fontSize: 13 }}>
              <T en={item.does} th={item.doesTh} />
            </p>
            <p className="text-muted" style={{ fontSize: 12, margin: "8px 0 0" }}>
              <T
                en="Approve writes into the same store as the calendar, housekeeping and sync. Refunds stay outside GM authority."
                th="อนุมัติแล้วเขียนลงคลังเดียวกับปฏิทิน แม่บ้าน และซิงก์ การคืนเงินอยู่นอกอำนาจ GM"
              />
            </p>
            <div className="gm-pop-actions">
              <button type="button" className="btn btn-primary" onClick={approveOne}>
                <T en="Approve" th="อนุมัติ" />
              </button>
              <button type="button" className="btn btn-secondary" onClick={dismissOne}>
                <T en="Dismiss today" th="ไม่ใช้วันนี้" />
              </button>
              {high.length > 1 && (
                <button type="button" className="btn btn-secondary" onClick={approveAllGmHigh}>
                  <T en={`Approve all GM high (${high.length})`} th={`อนุมัติรายการสูงของ GM ทั้งหมด (${high.length})`} />
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={later}>
                <T en="Later" th="ไว้ก่อน" />
              </button>
              {item.href && (
                <Link href={item.href} className="btn btn-ghost" onClick={later}>
                  <T en="Open screen" th="เปิดหน้าจอ" /> →
                </Link>
              )}
            </div>
            {typeof Notification !== "undefined" && Notification.permission === "default" && (
              <button type="button" className="btn btn-ghost gm-pop-device" onClick={enableDeviceNoti}>
                <T en="Also notify on this phone or tablet" th="แจ้งเตือนบนโทรศัพท์หรือแท็บเล็ตนี้ด้วย" />
              </button>
            )}
            {canNotify && (
              <p className="text-muted" style={{ fontSize: 12, margin: "8px 0 0" }}>
                <T en="This device will alert when a high GM item is waiting." th="เครื่องนี้จะเตือนเมื่อมีรายการสูงรอ GM" />
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
