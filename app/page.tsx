"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PLANS } from "@/lib/model";
import { LangToggle } from "@/components/LangToggle";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const FEATURES = [
  {
    n: "01",
    title: "AI Revenue Manager",
    th: "ผู้จัดการรายได้ที่ทำงานทุกคืน",
    copy: "AI monitors occupancy, booking pace, holidays, seasonality and competitor pricing, then recommends or automatically adjusts rates, minimum stay, last-minute promotions, OTA-specific offers and stop-sell — with a reason you can read.",
    copyTh: "AI ดูอัตราเข้าพัก จังหวะการจอง วันหยุด ฤดูกาล และราคาคู่แข่ง แล้วเสนอปรับราคา ขั้นต่ำการเข้าพัก โปรโมชันนาทีสุดท้าย และการปิดขาย — พร้อมเหตุผลที่อ่านเข้าใจได้",
    proof: "“Increase Deluxe Room from ฿2,200 to ฿2,550 this weekend because occupancy reached 82% and local demand is rising.”",
  },
  {
    n: "02",
    title: "OTA Profit Analyzer",
    th: "กำไรจริงต่อช่องทาง",
    copy: "Most systems show gross OTA revenue. HOTEL24 subtracts commission, promotions, payment charges, taxes, cancellations and advertising — then ranks which channel actually paid you per room-night.",
    copyTh: "ระบบอื่นบอกยอดขายรวมของแต่ละ OTA HOTEL24 หักค่าคอมมิชชัน โปรโมชัน ค่าธรรมเนียมการชำระเงิน ภาษี ค่ายกเลิก และค่าโฆษณา ออกก่อน แล้วเรียงให้เห็นว่าช่องทางไหนคุ้มที่สุดต่อหนึ่งคืน",
    proof: "Agoda sold 1.8× more than direct, but left ฿751 less profit per night.",
  },
  {
    n: "03",
    title: "AI Guest Concierge",
    th: "ผู้ช่วยตอบแขกหลายภาษา",
    copy: "A multilingual agent answers routine questions on LINE, WhatsApp and OTA messaging — check-in, transfers, breakfast, upgrades, late checkout, activities, cancellation. Sensitive questions go to staff.",
    copyTh: "ตอบคำถามซ้ำ ๆ ทาง LINE, WhatsApp และข้อความ OTA เป็นภาษาที่แขกใช้ เรื่องละเอียดอ่อนเช่นการคืนเงินส่งต่อให้พนักงานทันที",
    proof: "Compensation and refunds are outside AI authority — they escalate.",
  },
  {
    n: "04",
    title: "Owner Mode on LINE",
    th: "โหมดเจ้าของบน LINE",
    copy: "Every morning the owner receives arrivals, occupancy, unpaid reservations, rooms not ready, pricing recommendations, complaints and cash exceptions — and can approve a rate from the chat.",
    copyTh: "ทุกเช้าเจ้าของได้สรุปเข้า LINE และอนุมัติราคาได้จากในแชท — เจ้าของโรงแรมไทยสั่งงานผ่าน LINE อยู่แล้ว",
    proof: "Thai owners already run the property through LINE. Approving a rate from chat is a smaller ask than logging into a dashboard.",
  },
  {
    n: "05",
    title: "Direct Booking Booster",
    th: "ดันการจองตรงให้เป็นช่องทางหลัก",
    copy: "Mobile booking links for LINE OA, Facebook, Instagram, TikTok, Google Business Profile and lobby QR. Direct benefit without undercutting the public OTA rate — breakfast, late checkout, free cancellation.",
    copyTh: "ลิงก์จองตรงสำหรับ LINE OA, Facebook, Instagram, TikTok, Google และ QR — ให้สิทธิพิเศษแทนการลดราคา ราคาหน้าเว็บยังเท่า OTA",
    proof: "Breakfast for two costs ฿180. A 15% OTA commission on the same night is ฿330.",
  },
  {
    n: "06",
    title: "Overbooking Shield",
    th: "ป้องกันห้องขายเกิน",
    copy: "Detects unmapped rooms, delayed OTA updates, conflicting inventory, failed imports, duplicates and suspicious manual adjustments. Every inventory change has a complete audit log.",
    copyTh: "ตรวจห้องที่ยังไม่ map, การอัปเดต OTA ที่ล่าช้า, จำนวนห้องที่ขัดกัน, การนำเข้าที่ล้มเหลว, การจองซ้ำ และการแก้ด้วยมือที่น่าสงสัย",
    proof: "Who changed it, or what system changed it, and when.",
  },
];

const MODULES = [
  { en: "Central Reservation", th: "ปฏิทินการจองรวมทุกช่องทาง" },
  { en: "Channel Manager", th: "ซิงก์ห้อง ราคา เงื่อนไข กับ OTA" },
  { en: "Front Desk PMS", th: "เช็คอิน–เช็คเอาท์ จัดห้อง มัดจำ" },
  { en: "Direct Booking Engine", th: "หน้าจองของโรงแรมเอง" },
  { en: "Rate Manager", th: "ราคาตามฤดูกาลและอัตราเข้าพัก" },
  { en: "Guest Inbox", th: "LINE, WhatsApp, อีเมล, OTA" },
  { en: "Housekeeping", th: "สถานะห้อง งานทำความสะอาด" },
  { en: "Owner Dashboard", th: "Occupancy, ADR, RevPAR, เงินสด" },
  { en: "Finance", th: "ใบแจ้งหนี้ ใบเสร็จ คืนเงิน กระทบยอด" },
  { en: "Multi-property", th: "ดูแลหลายโรงแรมหรือวิลล่า" },
  { en: "Thailand Compliance", th: "พาสปอร์ต TM30 PDPA ภาษี" },
];

const PROFIT = [
  { ch: "Booking.com", gross: "฿1,046,000", cost: "−฿314,300", net: "฿731,700", netAdr: "฿1,776", hot: false },
  { ch: "Agoda", gross: "฿872,000", cost: "−฿340,440", net: "฿531,560", netAdr: "฿1,493", hot: false },
  { ch: "Direct", gross: "฿520,000", cost: "−฿75,600", net: "฿444,400", netAdr: "฿2,244", hot: true },
  { ch: "Airbnb", gross: "฿243,000", cost: "−฿63,250", net: "฿179,750", netAdr: "฿1,872", hot: false },
];

export default function LandingPage() {
  const { lang, authed, ready } = useStore();
  const router = useRouter();

  return (
    <div className="landing">
      <nav className="nav landing-nav">
        <span className="nav-brand">HOTEL<span>24</span></span>
        <a href="#system"><T en="System" th="ระบบ" /></a>
        <a href="#profit"><T en="Real profit" th="กำไรจริง" /></a>
        <a href="#thai">TM30 &amp; PDPA</a>
        <a href="#pricing"><T en="Pricing" th="ราคา" /></a>
        <LangToggle />
        <Link href={ready && authed ? "/reservations" : "/login"} className="btn btn-secondary"><T en="See the console" th="ดูระบบจริง" /></Link>
        <Link href="/login" className="btn btn-primary"><T en="Start 30-day trial" th="ทดลองฟรี 30 วัน" /></Link>
      </nav>

      <div className="landing-inner">
        <section className="landing-hero">
          <h1>
            <span><T en="An AI hotel" th="ระบบปฏิบัติการโรงแรม" /></span>
            <span><T en="operating system." th="ที่ทำงานแทนคุณ" /></span>
            <span className="hero-accent"><T en="ระบบปฏิบัติการโรงแรมที่ทำงานแทนคุณ" th="An AI hotel operating system." /></span>
          </h1>
          <p className="lede">
            <T
              en="Manage every reservation, OTA, room rate, guest message and hotel operation from one simple system—while AI helps increase revenue and reduce manual work. Built for independent hotels, boutique resorts, hostels and villas with 10–80 rooms."
              th="จัดการทุกการจอง ทุก OTA ทุกราคาห้อง ทุกข้อความจากแขก และงานหน้างานทั้งหมด จากระบบเดียว — พร้อม AI ที่ช่วยเพิ่มรายได้และลดงานซ้ำ ๆ สำหรับโรงแรมอิสระ รีสอร์ตบูทีค โฮสเทล และวิลล่า ขนาด 10–80 ห้อง"
            />
          </p>
          <p className="lede-sub">
            <T en="LINE-first. TM30-ready. Honest about what each channel actually pays you." th="LINE-first, พร้อม TM30 และบอกตรง ๆ ว่าช่องทางไหนจ่ายคุณจริง" />
          </p>
          <div className="landing-cta">
            <Link href="/login" className="btn btn-primary"><T en="Start free trial · 30 days" th="เริ่มทดลองใช้ฟรี 30 วัน" /></Link>
            <Link href="/login" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); router.push("/login"); }}><T en="See the console" th="ดูระบบจริง · See the console" /></Link>
          </div>
          <div className="landing-fine"><T en="No commission on bookings · cancel any month · Thai-speaking team" th="ไม่คิดค่าคอมมิชชันต่อการจอง · ยกเลิกได้ทุกเดือน · ทีมงานพูดไทย" /></div>
        </section>

        <hr className="hr" />

        <section className="stat-row landing-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "60+", en: "OTA channels through one white-label connection", th: "ช่องทาง OTA ผ่านการเชื่อมต่อครั้งเดียว" },
            { n: "2–4", en: "weeks to install and map rooms", th: "สัปดาห์ ติดตั้งและ mapping ห้องเสร็จ" },
            { n: "฿751", en: "extra net per night, Direct vs Agoda", th: "กำไรต่อคืนที่ต่างกันระหว่าง OTA กับจองตรง" },
            { n: "07:00", en: "owner brief on LINE every morning", th: "สรุปเช้าเข้า LINE เจ้าของทุกวัน" },
          ].map((s) => (
            <div key={s.n} className="stat-cell">
              <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{s.n}</div>
              <div className="stat-label" style={{ marginTop: 10 }}><T en={s.en} th={s.th} /></div>
            </div>
          ))}
        </section>

        <section id="system" className="landing-section">
          <div className="page-kicker"><T en="Six things that are not just another booking calendar" th="หกอย่างที่ทำให้ต่างจากระบบจองทั่วไป" /></div>
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
                        <td style={{ fontWeight: 800, color: p.hot ? "var(--color-accent-700)" : undefined }}>{p.ch}</td>
                        <td className="num">{p.gross}</td>
                        <td className="num text-muted">{p.cost}</td>
                        <td className="num">{p.net}</td>
                        <td className="num" style={{ color: p.hot ? "var(--color-accent-700)" : undefined }}>{p.netAdr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="proof" style={{ marginTop: 16 }}>
                <T
                  en="Move 15% of OTA volume to direct and you keep about ฿40,100 more per month at the same occupancy."
                  th="ย้ายยอดจาก OTA มาจองตรงเพียง 15% เท่ากับกำไรเพิ่มราว ฿40,100 ต่อเดือน ที่อัตราเข้าพักเดิม"
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
          <div className="page-kicker"><T en="Eleven modules. One system." th="หนึ่งระบบแทนงานทั้งหมด · สิบเอ็ดโมดูล" /></div>
          <div className="module-grid">
            {MODULES.map((m) => (
              <div key={m.en} className="module-cell">
                <strong>{m.en}</strong>
                <span>{m.th}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="landing-section">
          <div className="page-kicker"><T en="Pricing" th="ราคา" /></div>
          <h2><T en="A monthly SaaS fee. Never a cut of your bookings." th="ค่าบริการรายเดือน ไม่หักจากการจอง" /></h2>
          <p className="lede-sub"><T en="Owners already pay OTA commission. HOTEL24 does not stack another one." th="เจ้าของโรงแรมจ่ายค่าคอมมิชชันให้ OTA มากพอแล้ว" /></p>
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
                {PLANS.map((p, i) => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 800, color: i === 1 ? "var(--color-accent-700)" : undefined }}>{p.name}</td>
                    <td>{lang === "th" ? p.whoTh : p.who}</td>
                    <td className="num">{p.price}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 800 }}><T en="Setup & migration" th="ติดตั้งและย้ายข้อมูล" /></td>
                  <td><T en="OTA mapping, room setup, training" th="mapping OTA, ตั้งค่าห้อง, อบรมทีม" /></td>
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
              en="“I used to open three OTA extranets and Excel every morning. Now I look at one LINE thread and tap approve.”"
              th="“เมื่อก่อนต้องเปิดสามเว็บ OTA กับ Excel ทุกเช้า ตอนนี้ดูใน LINE อันเดียว แล้วกดอนุมัติราคา”"
            />
          </blockquote>
          <figcaption><T en="— owner, 38-room resort, Ao Nang, Krabi · pilot" th="— เจ้าของรีสอร์ต 38 ห้อง, อ่าวนาง กระบี่ · pilot property" /></figcaption>
        </section>
      </div>

      <section className="poster">
        <div className="landing-inner">
          <h3>
            <span><T en="Let AI run the rates and the repeats." th="ให้ AI ดูแลราคาและงานซ้ำ ๆ" /></span>
            <span><T en="You look after the guest." th="คุณดูแลแขก" /></span>
          </h3>
          <div className="landing-cta">
            <Link href="/login" className="btn btn-ghost poster-btn"><T en="Start 30-day trial" th="เริ่มทดลองใช้ฟรี 30 วัน" /></Link>
            <Link href="/login" className="btn btn-ghost poster-btn"><T en="Open the console first" th="ดูระบบจริงก่อน" /></Link>
          </div>
        </div>
      </section>

      <footer className="landing-foot">
        <div>
          <div className="nav-brand">HOTEL<span>24</span></div>
          <div style={{ marginTop: 8 }}><T en="AI hotel operating system for independent Thai properties." th="ระบบปฏิบัติการโรงแรมด้วย AI สำหรับที่พักอิสระในประเทศไทย" /></div>
        </div>
        <div>
          <strong>VIBE24</strong>
          <div style={{ marginTop: 8 }}>HOTEL24 — supply &amp; operations<br />TOUR24 — tours &amp; packages<br />VACATION24 — rooms, tours, transfers</div>
        </div>
        <div>
          <strong><T en="Console" th="ระบบ" /></strong>
          <div style={{ marginTop: 8 }}><Link href="/login"><T en="Sign in" th="เข้าสู่ระบบ" /></Link><br /><Link href="/book/baantalay"><T en="Direct booking page" th="หน้าจองตรง" /></Link></div>
        </div>
        <div className="text-muted" style={{ fontSize: 13 }}>
          <T en="Name and pricing here are for the product demo. Check trademarks and domains before using HOTEL24 commercially." th="ชื่อและราคาในหน้านี้เป็นตัวอย่างสำหรับการนำเสนอ · ตรวจสอบเครื่องหมายการค้าและโดเมนก่อนใช้ชื่อ HOTEL24 จริง" />
        </div>
      </footer>
    </div>
  );
}
