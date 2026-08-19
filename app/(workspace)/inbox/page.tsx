"use client";

import { THREADS } from "@/lib/model";
import { PageHead, statusCls } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function InboxPage() {
  const { thread, setThread, sent, sendDraft } = useStore();
  const t = THREADS[thread];
  const extra = sent[thread]?.length ?? 0;

  return (
    <div>
      <PageHead
        code="M-06 · Guest Inbox + AI Concierge · MVP"
        kickerEn="Killer feature"
        kickerTh="จุดเด่น"
        titleEn="Guest inbox"
        titleTh="กล่องข้อความแขก"
        subEn="LINE, WhatsApp, email and OTA messages in one workspace. AI answers the repeats. Staff take the rest."
        subTh="LINE, WhatsApp, อีเมล และข้อความ OTA อยู่ในที่เดียว — AI ตอบคำถามซ้ำ ๆ ให้ก่อน"
      />

      <div className="inbox-split">
        <aside className="inbox-list">
          {THREADS.map((th, i) => (
            <button key={th.id} type="button" className={`inbox-item${i === thread ? " on" : ""}`} onClick={() => setThread(i)}>
              <span className="inbox-bar" />
              <span>
                <span className="inbox-name">{th.name}</span>
                <span className="inbox-prev">{th.preview}</span>
                <span className="inbox-meta">{th.channel} · {th.time}</span>
              </span>
              <span className={statusCls(th.state)}>{th.state}</span>
            </button>
          ))}
        </aside>
        <section className="inbox-thread">
          <header className="inbox-head">
            <div>
              <strong>{t.name}</strong>
              <div className="text-muted" style={{ fontSize: 12 }}>{t.meta} · {t.lang}</div>
            </div>
            <span className={statusCls(t.state)}>{t.state}</span>
          </header>
          <div className="inbox-msgs">
            {t.messages.map((m, i) => (
              <div key={i} className={`bubble ${m.side}`}>
                <div className="bubble-who">{m.who} · {m.time}</div>
                <div>{m.text}</div>
                {m.sub && <div className="bubble-sub">{m.sub}</div>}
              </div>
            ))}
            {extra > 0 && t.draft && (
              <div className="bubble staff">
                <div className="bubble-who"><T en="Sent by you" th="คุณส่งแล้ว" /> · 09:12</div>
                <div>{t.draft}</div>
              </div>
            )}
          </div>
          {t.draft && extra === 0 && (
            <div className="inbox-draft">
              <div className="page-kicker"><T en="AI draft · edit before send" th="ร่าง AI · แก้ก่อนส่ง" /></div>
              <textarea className="input" defaultValue={t.draft} rows={4} />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="btn btn-primary" onClick={sendDraft}><T en="Send" th="ส่ง" /></button>
                <button className="btn btn-secondary"><T en="Escalate to staff" th="ส่งต่อพนักงาน" /></button>
              </div>
            </div>
          )}
          {(!t.draft || extra > 0) && t.state === "Escalated" && (
            <div className="callout" style={{ margin: 16 }}>
              <T en="Compensation and refunds are outside AI authority. Pushed to Owner Mode on LINE." th="การคืนเงินอยู่นอกอำนาจ AI ส่งเข้าโหมดเจ้าของบน LINE แล้ว" />
            </div>
          )}
        </section>
        <aside className="inbox-ctx">
          <h5 className="sec-h"><T en="Reservation" th="การจอง" /></h5>
          {t.context.map((c) => (
            <div key={c.k} className="ctx-row">
              <span>{c.k}</span>
              <strong>{c.v}</strong>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
