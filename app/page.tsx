"use client";

import Link from "next/link";
import { PLANS } from "@/lib/model";
import { LangToggle } from "@/components/LangToggle";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const FEATURES = [
  {
    n: "00",
    title: "HOTEL24 Agent Direct",
    th: "ให้ทุก AI จองตรงได้",
    copy: "Not another OTA. Every hotel publishes a machine-readable identity, live availability, rates, policies and a booking API. ChatGPT, Gemini and any MCP agent query the HOTEL24 Agent Gateway — then hold and book into your PMS. You own the guest.",
    copyTh: "ไม่ใช่ OTA อีกตัว ทุกโรงแรมมีตัวตนที่เครื่องอ่านได้ ห้องว่าง ราคา นโยบาย และ API จอง ChatGPT, Gemini และเอเจนต์ MCP ถามเกตเวย์ HOTEL24 แล้วกันห้องและจองเข้า PMS ของคุณ คุณเป็นเจ้าของแขก",
    proof: "search_hotels → create_room_hold → book_room. Booking.com never has to be involved.",
  },
  {
    n: "08",
    title: "HOTEL24 RevenueOS",
    th: "ทีมรายได้ AI อัตโนมัติ",
    copy: "Not one rate bot. A commercial department: Director, Demand, Pricing, Inventory, Distribution, Guardian. Engines calculate. Policy blocks a ฿500 mistake. Execution writes into the same ARI store. Level 2 guardrailed autopilot is the default.",
    copyTh: "ไม่ใช่บอทราคาตัวเดียว เป็นฝ่ายพาณิชย์: ผู้อำนวยการ ดีมานด์ ราคา ห้อง ช่องทาง ผู้พิทักษ์ เครื่องยนต์คำนวณ นโยบายบล็อก ฿500 ที่ผิด การลงมือเขียนคลัง ARI เดียวกัน ระดับ 2 ที่มีรั้วคือค่าเริ่มต้น",
    proof: "Garden Mon–Tue ฿1,980 → ฿2,200 because the twin says net peaks there — not because a competitor moved ฿100.",
  },
  {
    n: "01",
    title: "AI General Manager",
    th: "GM ที่เฝ้าโรงแรมทั้งหลัง",
    copy: "Watches overselling, rooms not ready, unpaid arrivals, TM30, stale ARI, cash exceptions and complaints. Ranks what will hurt tonight. You approve — each tap writes into the same store as the calendar, housekeeping and sync.",
    copyTh: "เฝ้าขายเกิน ห้องไม่พร้อม ค้างชำระ TM30 ARI ค้าง เงินสดขาด และคำร้องเรียน เรียงสิ่งที่จะเสียหายคืนนี้ คุณกดอนุมัติ — แต่ละครั้งเขียนลงคลังเดียวกับปฏิทิน แม่บ้าน และซิงก์",
    proof: "Four dirty rooms before 14:00, ฿16,810 unpaid, Family Loft oversold on Expedia — one Approve-all-high.",
  },
  {
    n: "02",
    title: "Revenue + Channel Autopilot",
    th: "ออโตไพลอตรายได้และช่องทาง",
    copy: "Rates, min-stay, last-minute and which OTA may hold the room — ranked by real net, not by who shouts on the extranet. Agoda sold more and still left ฿751 less profit per night, so four Garden rooms move to Direct.",
    copyTh: "ราคา ขั้นต่ำ นาทีสุดท้าย และ OTA ไหนกันห้องได้ — เรียงจากกำไรสุทธิจริง ไม่ใช่จากใครตะโกนในเอกซ์ทราเน็ต Agoda ขายมากกว่าแต่สุทธิต่ำกว่า ฿751 ต่อคืน จึงกัน Garden 4 ห้องให้จองตรง",
    proof: "Garden Deluxe ฿2,200 → ฿2,550 this weekend because occupancy hit 82%.",
  },
  {
    n: "03",
    title: "AI Reservation / Guest Agent",
    th: "เอเจนต์จองและแขก",
    copy: "Not a chatbot on the inbox. It creates, modifies and cancels stays, holds a clean room for 11:00, adds a ฿800 transfer to the folio, answers in the guest’s language — and still escalates refunds.",
    copyTh: "ไม่ใช่แชทบอทบนกล่องข้อความ สร้าง แก้ ยกเลิกการเข้าพัก กันห้องสะอาดไว้ 11:00 ใส่รถรับ ฿800 ที่โฟลิโอ ตอบภาษาแขก — และยังส่งเรื่องคืนเงินต่อคน",
    proof: "Compensation and refunds stay outside AI authority.",
  },
  {
    n: "04",
    title: "AI OTA Reconciliation",
    th: "กระทบยอด OTA ด้วย AI",
    copy: "Every few hours HOTEL24 is compared to each OTA. Mismatch, duplicate, stale ARI, failed import. Auto-resync. Alert only if it cannot close. The hotel is the system of record — remotes are forced to the master.",
    copyTh: "ทุกไม่กี่ชั่วโมงเทียบ HOTEL24 กับแต่ละ OTA ความไม่ตรง จองซ้ำ ARI ค้าง นำเข้าล้ม ซิงก์อัตโนมัติ เตือนเมื่อปิดเองไม่ได้ โรงแรมเป็นต้นฉบับ — ฝั่ง OTA ถูกบังคับให้ตาม",
    proof: "Trip.com Garden 20 Aug shows 2. HOTEL24 has 3. Forced. Recheck passed.",
  },
  {
    n: "05",
    title: "AI Reputation → Operations",
    th: "รีวิวกลายเป็นงานหน้างาน",
    copy: "A 2-star Google review is a room, a breakfast shift or a vacuum after 21:00 — not a marketing problem. Extract the defect, open the ticket, then draft a public reply that says what changed. Never refund in public.",
    copyTh: "รีวิว Google 2 ดาวคือห้อง กะอาหารเช้า หรือเครื่องดูดฝุ่นหลัง 21:00 — ไม่ใช่ปัญหาการตลาด ดึงจุดเสีย เปิดงาน แล้วค่อยร่างตอบสาธารณะว่าเปลี่ยนอะไร ห้ามคืนเงินในที่สาธารณะ",
    proof: "209 aircon → move to 301. Three slow-breakfast mentions → +2 F&B staff 08:00–09:30.",
  },
  {
    n: "06",
    title: "AI Migration Agent",
    th: "เอเจนต์ย้ายระบบ",
    copy: "Cloudbeds and Little Hotelier do not arrive clean. The agent proposes room/rate maps with a confidence score, flags duplicate stays and tax splits, then runs the one-button cut-over only when Shield will pass.",
    copyTh: "Cloudbeds กับ Little Hotelier ไม่ได้มาสะอาด เอเจนต์เสนอ map ห้อง/เรท พร้อมคะแนนความมั่นใจ ชี้การจองซ้ำและแยกภาษี แล้วค่อยกดตัดสลับเมื่อ Shield ผ่าน",
    proof: "Family Loft → Expedia Family Loft at 96%. Müller’s two source ids merge into H24-8802.",
  },
  {
    n: "07",
    title: "Owner Morning Brief + Action",
    th: "สรุปเช้าพร้อมปุ่มอนุมัติ",
    copy: "A brief without a button is a report. Each LINE row is a decision: mapping, collection, rate, room move. Approve writes into HOTEL24 — the same store the GM uses. Thai owners already live in that chat.",
    copyTh: "สรุปที่ไม่มีปุ่มคือรายงาน แต่ละบรรทัดบน LINE คือการตัดสินใจ: map เก็บเงิน ราคา ย้ายห้อง กดอนุมัติแล้วเขียนลง HOTEL24 — คลังเดียวกับ GM เจ้าของไทยอยู่ในแชทนั้นอยู่แล้ว",
    proof: "“I look at one LINE thread and tap approve.”",
  },
];

const MODULES = [
  { en: "HOTEL24 Agent Direct", th: "เชื่อมครั้งเดียว — ทุก AI จองตรงได้" },
  { en: "HOTEL24 RevenueOS", th: "ทีมรายได้ AI — เครื่องยนต์คิด รั้วกันพัง" },
  { en: "Hotel Agent Protocol (HAP)", th: "สเปกเปิดบน Schema.org / MCP / ACP / UCP" },
  { en: "AI Hotel Registry", th: "โรงแรมที่ยืนยันแล้ว ให้เอเจนต์ถามได้" },
  { en: "AI Direct Offers", th: "ราคาเท่า OTA สิทธิ์ดีกว่า อ่านได้โดยเอเจนต์" },
  { en: "AEO", th: "hotel24.json · llms.txt · OAI-SearchBot" },
  { en: "AI General Manager", th: "GM อัตโนมัติ — อนุมัติงานทั้งโรงแรม" },
  { en: "Revenue + Channel Autopilot", th: "ราคา ขั้นต่ำ จัดสรรห้องตามกำไรสุทธิ" },
  { en: "White-label Channel Manager", th: "OTA เป็นช่องทางหนึ่ง ไม่ใช่ศูนย์กลาง" },
  { en: "One-button PMS switch", th: "ย้ายจาก Cloudbeds / Little Hotelier" },
  { en: "Front Desk PMS", th: "เช็คอิน–เช็คเอาท์ จัดห้อง มัดจำ" },
  { en: "Thailand Compliance", th: "พาสปอร์ต TM30 PDPA ภาษี" },
];

const PROFIT = [
  { ch: "Booking.com", gross: "฿1,046,000", cost: "−฿314,300", net: "฿731,700", netAdr: "฿1,776", hot: false },
  { ch: "Agoda", gross: "฿872,000", cost: "−฿340,440", net: "฿531,560", netAdr: "฿1,493", hot: false },
  { ch: "Direct", gross: "฿520,000", cost: "−฿75,600", net: "฿444,400", netAdr: "฿2,244", hot: true },
  { ch: "Airbnb", gross: "฿243,000", cost: "−฿63,250", net: "฿179,750", netAdr: "฿1,872", hot: false },
];

export default function LandingPage() {
  const { lang, authed, ready, switchStatus } = useStore();
  const consoleHref = ready && authed ? (switchStatus === "done" ? "/gm" : "/switch") : "/login";

  return (
    <div className="landing">
      <nav className="nav landing-nav">
        <span className="nav-brand">HOTEL<span>24</span></span>
        <a href="#agent"><T en="Agent Direct" th="Agent Direct" /></a>
        <a href="#revenueos"><T en="RevenueOS" th="RevenueOS" /></a>
        <a href="#system"><T en="AI" th="AI" /></a>
        <a href="#connect"><T en="Channels" th="ช่องทาง" /></a>
        <a href="#switch"><T en="Switch" th="ย้ายระบบ" /></a>
        <a href="#profit"><T en="Real profit" th="กำไรจริง" /></a>
        <a href="#thai">TM30 &amp; PDPA</a>
        <a href="#pricing"><T en="Pricing" th="ราคา" /></a>
        <LangToggle />
        <Link href={consoleHref} className="btn btn-secondary"><T en="See the console" th="ดูระบบจริง" /></Link>
        <Link href="/login" className="btn btn-primary"><T en="Start 30-day trial" th="ทดลองฟรี 30 วัน" /></Link>
      </nav>

      <div className="landing-inner">
        <section className="landing-hero">
          <h1>
            <span><T en="Make your hotel" th="ทำให้โรงแรมคุณ" /></span>
            <span><T en="AI-bookable." th="จองผ่าน AI ได้" /></span>
            <span className="hero-accent"><T en="Connect once. Own the guest." th="เชื่อมครั้งเดียว เป็นเจ้าของแขก" /></span>
          </h1>
          <p className="lede">
            <T
              en="Today the traveler goes through Booking.com. Tomorrow they ask ChatGPT. HOTEL24 sits underneath: AI agent → Agent Gateway → your PMS → a Direct booking. You keep the guest, the payment, and the relationship."
              th="วันนี้ผู้เดินทางผ่าน Booking.com พรุ่งนี้เขาถาม ChatGPT HOTEL24 อยู่ข้างล่าง: เอเจนต์ AI → เกตเวย์ → PMS ของคุณ → จองตรง คุณเก็บแขก การชำระ และความสัมพันธ์"
            />
          </p>
          <p className="lede-sub">
            <T en="Not another OTA. Hotel operating system + AI distribution network. OTAs become one channel inside HOTEL24 — not the centre." th="ไม่ใช่ OTA อีกตัว ระบบปฏิบัติการโรงแรม + เครือข่ายกระจายผ่าน AI OTA เป็นช่องทางหนึ่งใน HOTEL24 — ไม่ใช่ศูนย์กลาง" />
          </p>
          <div className="landing-cta">
            <Link href="/agents" className="btn btn-primary"><T en="Ask an agent to book" th="ให้เอเจนต์จองให้ดู" /></Link>
            <Link href="/login" className="btn btn-secondary"><T en="Open the hotel console" th="เปิดคอนโซลโรงแรม" /></Link>
          </div>
          <div className="landing-fine"><T en="We don’t own your guests. You do. SaaS + a low AI-direct fee — never an OTA-style cut." th="เราไม่ได้เป็นเจ้าของแขกคุณ คุณเป็น รายเดือน + ค่าธรรมเนียมจองตรงผ่าน AI ต่ำ — ไม่หักแบบ OTA" /></div>
        </section>

        <hr className="hr" />

        <section className="stat-row landing-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "15", en: "MCP tools every AI can call", th: "เครื่องมือ MCP ที่ทุก AI เรียกได้" },
            { n: "HAP", en: "Hotel Agent Protocol — open spec", th: "โปรโตคอลเอเจนต์โรงแรม — สเปกเปิด" },
            { n: "฿0", en: "OTA commission on an Agent Direct booking", th: "ค่าคอม OTA ต่อการจอง Agent Direct" },
            { n: "1.9%", en: "AI-direct transaction fee. You own the guest.", th: "ค่าธรรมเนียมจองตรงผ่าน AI แขกเป็นของคุณ" },
          ].map((s) => (
            <div key={s.n} className="stat-cell">
              <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{s.n}</div>
              <div className="stat-label" style={{ marginTop: 10 }}><T en={s.en} th={s.th} /></div>
            </div>
          ))}
        </section>

        <section id="agent" className="landing-section">
          <div className="page-kicker">HOTEL24 Agent Direct</div>
          <h2><T en="Connect your hotel once. Become bookable by every AI." th="เชื่อมโรงแรมครั้งเดียว ให้ทุก AI จองได้" /></h2>
          <p className="lede-sub">
            <T
              en="A hashtag is not enough. Agents need structured, current rooms, rates, taxes, cancellation, photos and a way to reserve. HOTEL24 publishes hotel24.json, Schema.org JSON-LD, MCP tools, an ACP-shaped Travel feed, and AEO for OAI-SearchBot. The owner never has to learn those names."
              th="แฮชแท็กไม่พอ เอเจนต์ต้องได้ห้อง ราคา ภาษี การยกเลิก รูป และวิธีจอง HOTEL24 ปล่อย hotel24.json, Schema.org JSON-LD, เครื่องมือ MCP, ฟีด Travel แบบ ACP และ AEO สำหรับ OAI-SearchBot เจ้าของไม่ต้องไปเรียนชื่อพวกนั้น"
            />
          </p>
          <div className="module-grid" style={{ marginTop: 22 }}>
            {[
              { en: "HOTEL24 PMS", th: "ต้นฉบับห้อง ราคา การจอง" },
              { en: "Channel Manager", th: "Booking / Agoda / Trip / Expedia" },
              { en: "HOTEL24 Direct", th: "หน้าจองของโรงแรมเอง" },
              { en: "AI Distribution", th: "ChatGPT · Gemini · MCP · UCP · ACP" },
              { en: "RevenueOS", th: "ทีมรายได้ AI · Guardian · ฝาแฝด" },
            ].map((m) => (
              <div key={m.en} className="module-cell">
                <strong>{m.en}</strong>
                <span>{m.th}</span>
              </div>
            ))}
          </div>
          <div className="landing-cta">
            <Link href="/agents" className="btn btn-primary"><T en="Watch an agent book Chiang Mai" th="ดูเอเจนต์จองเชียงใหม่" /></Link>
            <a href="/.well-known/hotel24.json" className="btn btn-secondary">hotel24.json</a>
          </div>
        </section>

        <section id="revenueos" className="landing-section">
          <div className="page-kicker">HOTEL24 RevenueOS</div>
          <h2><T en="Your revenue team works 24/7." th="ทีมรายได้คุณทำงานตลอด 24 ชม." /></h2>
          <p className="lede-sub">
            <T
              en="A 40-room hotel cannot hire a Revenue Director, RM, distribution manager and analyst. RevenueOS is that department: engines calculate, Guardian blocks a ฿500 error, execution writes into the PMS. Level 2 guardrailed autopilot is the default. An LLM never sets the rate alone."
              th="โรงแรม 40 ห้องจ้างผู้อำนวยการรายได้ RM ผู้จัดการช่องทาง และนักวิเคราะห์ไม่ได้ RevenueOS คือฝ่ายนั้น: เครื่องยนต์คำนวณ Guardian บล็อก ฿500 ที่ผิด การลงมือเขียนเข้า PMS ระดับ 2 ที่มีรั้วคือค่าเริ่มต้น LLM ห้ามตั้งราคาคนเดียว"
            />
          </p>
          <div className="module-grid" style={{ marginTop: 22 }}>
            {[
              { en: "Demand Brain", th: "ใครจะจอง เมื่อไหร่ เท่าไหร่" },
              { en: "Price Brain", th: "ควรคิดเท่าไหร่ — สุทธิคาด ไม่ใช่คู่แข่ง" },
              { en: "Inventory Brain", th: "ใครได้ห้องที่ขาด" },
              { en: "Distribution Brain", th: "ขายที่ไหน — Net ADR" },
              { en: "Guardian", th: "หยุดการตัดสินใจที่พัง" },
            ].map((m) => (
              <div key={m.en} className="module-cell">
                <strong>{m.en}</strong>
                <span>{m.th}</span>
              </div>
            ))}
          </div>
          <div className="landing-cta">
            <Link href="/login" className="btn btn-primary"><T en="Open the Revenue Director" th="เปิดผู้อำนวยการรายได้" /></Link>
          </div>
        </section>

        <section id="system" className="landing-section">
          <div className="page-kicker"><T en="The defining idea, then the engines that run the house" th="แนวคิดหลัก แล้วเครื่องยนต์ที่ดูแลโรงแรม" /></div>
          {FEATURES.map((f) => (
            <div key={f.n} className="feature-row">
              <div className="feature-n"><span />{f.n}</div>
              <div>
                <h2>{f.title}</h2>
                <div className="text-muted">{f.th}</div>
              </div>
              <div>
                <p><T en={f.copy} th={f.copyTh} /></p>
                <div className="proof">{f.proof}</div>
              </div>
            </div>
          ))}
        </section>

        <section id="profit" className="landing-section">
          <div className="split-main" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
            <div>
              <div className="page-kicker"><T en="The report OTAs never send you" th="รายงานที่ OTA ไม่เคยให้คุณ" /></div>
              <h2><T en="Gross is not profit." th="ยอดขายไม่ใช่กำไร" /></h2>
              <p className="lede-sub">
                <T
                  en="Same 42-room property, one month. Every channel sold rooms. They did not all pay you the same."
                  th="โรงแรม 42 ห้อง เดือนเดียวกัน ทุกช่องทางขายได้ แต่ไม่ได้จ่ายคุณเท่ากัน"
                />
              </p>
            </div>
            <div>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th><T en="Channel" th="ช่องทาง" /></th>
                      <th className="num"><T en="Gross" th="ยอดขาย" /></th>
                      <th className="num"><T en="Cost of sale" th="ต้นทุนการขาย" /></th>
                      <th className="num"><T en="Net" th="กำไรสุทธิ" /></th>
                      <th className="num"><T en="Per night" th="ต่อคืน" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROFIT.map((p) => (
                      <tr key={p.ch}>
                        <td style={{ fontWeight: 800, color: p.hot ? "var(--color-hot-700)" : undefined }}>{p.ch}</td>
                        <td className="num">{p.gross}</td>
                        <td className="num text-muted">{p.cost}</td>
                        <td className="num">{p.net}</td>
                        <td className="num" style={{ color: p.hot ? "var(--color-hot-700)" : undefined }}>{p.netAdr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="proof" style={{ marginTop: 16 }}>
                <T
                  en="Agent Direct is not in this OTA table on purpose. A ChatGPT booking lands as Direct — 1.9% fee, hotel owns the guest, Booking.com is not in the path."
                  th="Agent Direct ไม่ได้อยู่ในตาราง OTA นี้โดยตั้งใจ การจองจาก ChatGPT ลงเป็นจองตรง — ค่าธรรมเนียม 1.9% โรงแรมเป็นเจ้าของแขก ไม่มี Booking.com ในเส้นทาง"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="thai" className="landing-section thai-split">
          <div>
            <div className="page-kicker"><T en="It actually works in a Thai hotel" th="ทำงานได้จริงในโรงแรมไทย" /></div>
            <h2><T en="Passport, TM30, PDPA — work foreign systems do not do." th="พาสปอร์ต, TM30, PDPA — งานที่ระบบต่างชาติไม่ทำให้" /></h2>
            <p className="lede-sub">
              <T
                en="Scan the passport at check-in. HOTEL24 queues TM30 within 24 hours, keeps the receipt against the reservation, enforces PDPA access, and issues tax invoices with daily cash reconciliation."
                th="สแกนพาสปอร์ตตอนเช็คอิน ระบบเตรียมแจ้งที่พักคนต่างชาติ TM30 ให้ภายใน 24 ชั่วโมง เก็บใบรับแจ้งไว้กับการจอง คุมสิทธิ์ตาม PDPA และออกใบกำกับภาษีกับสรุปรายวัน"
              />
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              <span className="tag tag-neutral">TM30</span>
              <span className="tag tag-neutral">PDPA 90 days</span>
              <span className="tag tag-neutral"><T en="Tax invoice" th="ใบกำกับภาษี" /></span>
              <span className="tag tag-neutral">LINE-first</span>
              <span className="tag tag-neutral">PromptPay</span>
            </div>
          </div>
          <div className="thai-panel">
            <div className="thai-panel-kicker">Baan Talay · Ao Nang</div>
            <div className="stat-val">37/42</div>
            <div className="text-muted"><T en="Occupied tonight" th="เข้าพักคืนนี้" /></div>
            <div className="hr" />
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
              <T en="Connectivity through a white-label provider covering 60+ channels. Direct Booking.com or Expedia certification comes later — when you have hundreds of properties, not 42 rooms." th="เชื่อมต่อ OTA กว่า 60 ช่องทางผ่านผู้ให้บริการ connectivity แบบ white-label — ติดตั้ง 2–4 สัปดาห์ ไม่ต้องรอ certification ของแต่ละ OTA" />
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="page-kicker"><T en="Fifteen modules. One system." th="หนึ่งระบบแทนงานทั้งหมด · สิบห้าโมดูล" /></div>
          <div className="module-grid">
            {MODULES.map((m) => (
              <div key={m.en} className="module-cell">
                <strong>{m.en}</strong>
                <span>{m.th}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="switch" className="landing-section">
          <div className="page-kicker"><T en="Switching from Cloudbeds or Little Hotelier" th="ย้ายจาก Cloudbeds หรือ Little Hotelier" /></div>
          <h2><T en="One button. Your old PMS comes with you." th="ปุ่มเดียว ระบบเดิมตามมาด้วย" /></h2>
          <p className="lede-sub">
            <T
              en="Rooms, rates, OTA mappings, future reservations, guests and folios move from Cloudbeds or Little Hotelier. Overbooking Shield checks the import. Then HOTEL24 is the system of record and the old PMS stays read-only for 30 days."
              th="ย้ายห้อง ราคา mapping OTA การจองอนาคต แขก และโฟลิโอจาก Cloudbeds หรือ Little Hotelier Shield ตรวจตอนนำเข้า แล้ว HOTEL24 เป็นระบบจริง ระบบเดิมเหลือโหมดอ่านอย่างเดียว 30 วัน"
            />
          </p>
          <div className="landing-cta">
            <Link href="/login" className="btn btn-primary"><T en="Move my hotel to HOTEL24" th="ย้ายโรงแรมมา HOTEL24" /></Link>
          </div>
        </section>

        <section id="connect" className="landing-section">
          <div className="page-kicker"><T en="White-label channel manager" th="ตัวจัดการช่องทางแบบ white-label" /></div>
          <h2><T en="HOTEL24 owns the hotel. Channex talks to the OTAs." th="HOTEL24 เป็นระบบของโรงแรม Channex คุยกับ OTA" /></h2>
          <p className="lede-sub">
            <T
              en="This is not Booking.com Demand API or Expedia Rapid. Those sell travel to travellers. HOTEL24 needs Connectivity: rooms, rates, availability and reservations in the hotel’s existing OTA accounts. One integration covers Booking.com, Agoda, Expedia, Trip.com, Airbnb and 50+ more. Direct OTA certification waits until the product is large enough to justify it — Booking.com is also pausing new connectivity providers."
              th="นี่ไม่ใช่ Demand API ของ Booking.com หรือ Expedia Rapid ที่ขายท่องเที่ยวให้ผู้เดินทาง HOTEL24 ต้องการ Connectivity: ห้อง ราคา ความว่าง และการจองในบัญชี OTA ที่โรงแรมมีอยู่แล้ว เชื่อมครั้งเดียวครอบ Booking.com, Agoda, Expedia, Trip.com, Airbnb และอีก 50+ ช่องทาง การไป certification ตรงกับ OTA รอจนกว่าธุรกิจใหญ่พอ — และ Booking.com ยังพักรับผู้ให้บริการ connectivity รายใหม่"
            />
          </p>
          <p className="lede-sub">
            <T
              en="Inside HOTEL24: property master, mapping engine, inventory, ARI, reservation receiver, modifications and cancellations, queued sync, health monitor, automatic reconciliation, tokenised payments. Combined with the Cloudbeds / Little Hotelier switch, the offer is: move in one day, map rooms, connect Booking/Agoda/Expedia, validate inventory, cut over."
              th="ใน HOTEL24 มีต้นฉบับที่พัก ตัว map ห้องคงเหลือ ARI ตัวรับจอง แก้ไข/ยกเลิก คิวซิงก์ ตัววัดสุขภาพ กระทบยอดอัตโนมัติ และการชำระแบบโทเคน รวมกับปุ่มย้ายจาก Cloudbeds / Little Hotelier ข้อเสนอคือ ย้ายในหนึ่งวัน map ห้อง เชื่อม Booking/Agoda/Expedia ตรวจห้อง แล้วตัดสลับ"
            />
          </p>
          <div className="landing-cta">
            <Link href="/login" className="btn btn-primary"><T en="Open Connection Center" th="เปิดศูนย์ช่องทาง" /></Link>
          </div>
        </section>

        <section id="pricing" className="landing-section">
          <div className="page-kicker"><T en="Pricing" th="ราคา" /></div>
          <h2><T en="SaaS + a low AI-direct fee. We don’t own your guests." th="รายเดือน + ค่าธรรมเนียมจองตรงผ่าน AI ต่ำ เราไม่ได้เป็นเจ้าของแขกคุณ" /></h2>
          <p className="lede-sub"><T en="OTAs take 15–20%. HOTEL24 Agent Direct is 1.9% on AI-direct bookings only — because the hotel keeps the guest, the payment, and the relationship." th="OTA หัก 15–20% HOTEL24 Agent Direct เก็บ 1.9% เฉพาะจองตรงผ่าน AI — เพราะโรงแรมเก็บแขก การชำระ และความสัมพันธ์" /></p>
          <div className="table-wrap" style={{ marginTop: 22 }}>
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Package" th="แพ็กเกจ" /></th>
                  <th><T en="For" th="เหมาะกับ" /></th>
                  <th className="num"><T en="Price" th="ราคา" /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Agent Direct</strong></td>
                  <td><T en="AI-direct bookings only. Hotel owns the guest." th="เฉพาะจองตรงผ่าน AI โรงแรมเป็นเจ้าของแขก" /></td>
                  <td className="num">1.9%</td>
                </tr>
                {PLANS.map((p, i) => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 800, color: i === 1 ? "var(--color-accent-700)" : undefined }}>{p.name}</td>
                    <td>{lang === "th" ? p.whoTh : p.who}</td>
                    <td className="num">{p.price}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 800 }}><T en="Setup & migration" th="ติดตั้งและย้ายข้อมูล" /></td>
                  <td><T en="One-button Cloudbeds / Little Hotelier move, mapping, training" th="ย้าย Cloudbeds / Little Hotelier ปุ่มเดียว, mapping, อบรมทีม" /></td>
                  <td className="num">฿5,000–25,000</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800 }}>Managed Revenue</td>
                  <td><T en="HOTEL24 team runs rates and promotions" th="ทีม HOTEL24 ดูแลราคาและโปรโมชันให้" /></td>
                  <td className="num"><T en="Monthly or performance" th="รายเดือน หรือคิดตามผลงาน" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="landing-quote">
          <blockquote>
            <T
              en="“Booking.com used to own the guest. Now ChatGPT asks HOTEL24, holds the room, and we take the booking ourselves.”"
              th="“เมื่อก่อน Booking.com เป็นเจ้าของแขก ตอนนี้ ChatGPT ถาม HOTEL24 จองห้อง แล้วเราเก็บการจองเอง”"
            />
          </blockquote>
          <figcaption><T en="— owner, 38-room resort, Ao Nang, Krabi · pilot" th="— เจ้าของรีสอร์ต 38 ห้อง, อ่าวนาง กระบี่ · pilot property" /></figcaption>
        </section>
      </div>

      <section className="poster">
        <div className="landing-inner">
          <h3>
            <span><T en="Connect once. Be discovered by every AI." th="เชื่อมครั้งเดียว ให้ทุก AI ค้นพบ" /></span>
            <span><T en="Take the reservation. Own the guest." th="รับจองเอง เป็นเจ้าของแขก" /></span>
          </h3>
          <div className="landing-cta">
            <Link href="/agents" className="btn btn-ghost poster-btn"><T en="Ask an agent to book" th="ให้เอเจนต์จองให้ดู" /></Link>
            <Link href="/login" className="btn btn-ghost poster-btn"><T en="Open the hotel console" th="เปิดคอนโซลโรงแรม" /></Link>
          </div>
        </div>
      </section>

      <footer className="landing-foot">
        <div>
          <div className="nav-brand">HOTEL<span>24</span></div>
          <div style={{ marginTop: 8 }}><T en="Hotel operating system + AI distribution. Make independent hotels AI-bookable." th="ระบบปฏิบัติการโรงแรม + เครือข่ายกระจายผ่าน AI ทำให้โรงแรมอิสระจองผ่าน AI ได้" /></div>
        </div>
        <div>
          <strong>VIBE24</strong>
          <div style={{ marginTop: 8 }}>HOTEL24 — supply &amp; operations<br />TOUR24 — tours &amp; packages<br />VACATION24 — rooms, tours, transfers</div>
        </div>
        <div>
          <strong><T en="Console" th="ระบบ" /></strong>
          <div style={{ marginTop: 8 }}><Link href="/login"><T en="Sign in" th="เข้าสู่ระบบ" /></Link><br /><Link href="/agents"><T en="Agent playground" th="หน้าทดลองเอเจนต์" /></Link><br /><Link href="/book/baantalay"><T en="Direct booking page" th="หน้าจองตรง" /></Link></div>
        </div>
        <div className="text-muted" style={{ fontSize: 13 }}>
          <T en="Name and pricing here are for the product demo. Check trademarks and domains before using HOTEL24 commercially." th="ชื่อและราคาในหน้านี้เป็นตัวอย่างสำหรับการนำเสนอ · ตรวจสอบเครื่องหมายการค้าและโดเมนก่อนใช้ชื่อ HOTEL24 จริง" />
        </div>
      </footer>
    </div>
  );
}
