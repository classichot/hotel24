"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { T } from "@/lib/i18n";
import { ENGINE_EXPLAIN, explainEngines, playbookFor, type EngineExplain, type MenuPlaybook } from "@/lib/playbook";

function useOpen(key: string, initial = true) {
  const [open, setOpen] = useState(initial);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw === "0") setOpen(false);
      if (raw === "1") setOpen(true);
    } catch { /* ignore */ }
  }, [key]);
  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      try { sessionStorage.setItem(key, next ? "1" : "0"); } catch { /* ignore */ }
      return next;
    });
  };
  return { open, toggle };
}

export function EngineCard({ engine: e, defaultOpen }: { engine: EngineExplain; defaultOpen?: boolean }) {
  return (
    <details className="engine-guide" open={defaultOpen}>
      <summary>
        <span className="engine-guide-n">{e.n}</span>
        <span>
          <strong><T en={e.en} th={e.th} /></strong>
          <span className="text-muted" style={{ fontSize: 11, marginLeft: 8 }}>
            {e.phase === "signal" ? <T en="signal" th="สัญญาณ" /> : <T en={`Phase ${e.phase}`} th={`เฟส ${e.phase}`} />}
          </span>
        </span>
      </summary>
      <div className="engine-guide-body">
        <div className="engine-guide-grid">
          <div>
            <h6><T en="What it calculates" th="คำนวณอะไร" /></h6>
            <p><T en={e.what} th={e.whatTh} /></p>
          </div>
          <div>
            <h6><T en="Why it exists" th="ทำไมมีเครื่องนี้" /></h6>
            <p><T en={e.why} th={e.whyTh} /></p>
          </div>
          <div>
            <h6><T en="Reads" th="อ่านจาก" /></h6>
            <p><T en={e.reads} th={e.readsTh} /></p>
          </div>
          <div>
            <h6><T en="Writes" th="เขียนอะไร" /></h6>
            <p><T en={e.writes} th={e.writesTh} /></p>
          </div>
          <div>
            <h6><T en="On Baan Talay" th="บนบ้านทะเล" /></h6>
            <p><T en={e.demo} th={e.demoTh} /></p>
          </div>
          <div>
            <h6><T en="Never" th="ห้าม" /></h6>
            <p><T en={e.never} th={e.neverTh} /></p>
          </div>
        </div>
        {e.href && (
          <Link href={e.href} className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 8 }}>
            <T en="Open this engine" th="เปิดเครื่องนี้" /> →
          </Link>
        )}
      </div>
    </details>
  );
}

export function EngineGuide({ ids, openFirst = true }: { ids: string[]; openFirst?: boolean }) {
  const list = explainEngines(ids);
  if (!list.length) return null;
  return (
    <div className="engine-guide-list">
      <h5 className="sec-h" style={{ marginTop: 16 }}>
        <T en={list.length === 1 ? "Engine explanation" : "Engine explanations"} th={list.length === 1 ? "คำอธิบายเครื่องยนต์" : "คำอธิบายเครื่องยนต์"} />
      </h5>
      {list.map((e, i) => (
        <EngineCard key={e.id} engine={e} defaultOpen={list.length === 1 || (openFirst && i === 0)} />
      ))}
    </div>
  );
}

function PlaybookBody({ book }: { book: MenuPlaybook }) {
  return (
    <div className="playbook-body">
      <p className="playbook-why"><T en={book.why} th={book.whyTh} /></p>
      <ol className="playbook-steps">
        {book.steps.map((s) => (
          <li key={s.en}><T en={s.en} th={s.th} /></li>
        ))}
      </ol>
      <p className="playbook-look">
        <strong><T en="Look for" th="ดูที่" /> · </strong>
        <T en={book.look} th={book.lookTh} />
      </p>
      <p className="playbook-seed">
        <T en={book.seed} th={book.seedTh} />
      </p>
      {book.engines && book.engines.length > 0 && (
        <EngineGuide ids={book.engines} openFirst={book.engines.length <= 2} />
      )}
    </div>
  );
}

export function ScreenPlaybook() {
  const path = usePathname();
  const book = playbookFor(path);
  const { open, toggle } = useOpen(`hotel24.playbook:${path}`, true);
  if (!book) return null;

  return (
    <section className="playbook no-print">
      <button type="button" className="playbook-toggle" onClick={toggle} aria-expanded={open}>
        <span className="playbook-kicker">{book.code} · <T en="Playbook" th="เพลย์บุ๊ก" /></span>
        <span className="playbook-title"><T en={book.title} th={book.titleTh} /></span>
        <span className="playbook-chevron">{open ? "–" : "+"}</span>
      </button>
      {open && <PlaybookBody book={book} />}
    </section>
  );
}

export function PlaybookIndex() {
  return (
    <div>
      {ENGINE_EXPLAIN.filter((e) => e.n !== "—").map((e) => (
        <EngineCard key={e.id} engine={e} />
      ))}
      <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Supporting / later" th="เสริม / รอบหลัง" /></h5>
      {ENGINE_EXPLAIN.filter((e) => e.n === "—").map((e) => (
        <EngineCard key={e.id} engine={e} />
      ))}
    </div>
  );
}
