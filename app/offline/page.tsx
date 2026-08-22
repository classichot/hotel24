import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline — HOTEL24",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="offline-page">
      <div className="page-kicker">HOTEL24 · offline</div>
      <h1>The shell is here. The network is not.</h1>
      <p className="lede-sub">
        HOTEL24 is installed on this device. Search, hold and book still need a connection — the hotel stays the merchant of record.
      </p>
      <p className="lede-sub">เปลือกแอพอยู่บนเครื่องแล้ว การค้นหา กันห้อง และจองยังต้องมีเน็ต — โรงแรมยังเป็นผู้ค้าตามกฎหมาย</p>
      <div className="landing-cta">
        <Link href="/" className="btn btn-primary">Retry</Link>
        <Link href="/agents" className="btn btn-secondary">Agent Direct</Link>
        <Link href="/login" className="btn btn-secondary">Hotel console</Link>
      </div>
    </div>
  );
}
