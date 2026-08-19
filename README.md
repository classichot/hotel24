# HOTEL24

**An AI Hotel Operating System for independent hotels, boutique resorts, hostels, villas and serviced apartments.**

> Manage every reservation, OTA, room rate, guest message and hotel operation from one simple system—while AI helps increase revenue and reduce manual work.

Positioned for independent Thai properties (about 10–80 rooms) that already sit on two or more OTAs and still run the house through Excel, paper, LINE and extranets.

This is not a simpler PMS. Cloudbeds and Little Hotelier already combine PMS, channel management and direct booking. HOTEL24’s edge is **Thai localisation + LINE-first operation + AI revenue management + real OTA profitability**.

## Demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Console: [http://localhost:3000/login](http://localhost:3000/login) · `som@baantalay.com` / `demo1234` — owners land on **Switch from PMS** (`/switch`): one button moves Cloudbeds or Little Hotelier.

Guest booking page: [http://localhost:3000/book/baantalay](http://localhost:3000/book/baantalay)

Seeded property: **Baan Talay Boutique Resort**, Ao Nang, Krabi, 42 rooms, plus a hostel and three villas.

## MVP

1. Reservation calendar and PMS  
2. White-label OTA channel manager (Channex-style — not direct Booking.com / Expedia certification)  
3. Direct-booking engine  
4. Rate and inventory management  
5. Check-in/out and payment records  
6. Housekeeping board  
7. Owner dashboard  
8. Automated LINE notifications  
9. Basic AI pricing recommendations  
10. OTA commission and net-revenue reporting  
11. **One-button switch** from Cloudbeds or Little Hotelier (rooms, rates, mappings, reservations, guests, folios, then cut over)  

Plus Thailand compliance: passport capture, TM30 workflow, PDPA controls, tax-document support.

## Killing features

1. **AI Revenue Manager** — occupancy, pace, holidays, seasonality, competitor rates → rates, min-stay, last-minute, stop-sell, with a readable reason.  
2. **OTA Profit Analyzer** — net per channel after commission, promos, payment fees, tax, cancellations, ads.  
3. **AI Guest Concierge** — LINE / WhatsApp / OTA; routine questions; escalate the rest.  
4. **Owner Mode on LINE** — morning brief and approve-in-chat.  
5. **Direct Booking Booster** — LINE OA, Facebook, Instagram, TikTok, GBP, QR. Benefit, not a public undercut.  
6. **Overbooking Shield** — unmapped rooms, delayed ARI, conflicts, failed imports, duplicates, audit log.

## Architecture

```
HOTEL24 PMS → white-label connectivity provider → Booking.com, Agoda, Expedia, Airbnb, Trip.com
```

Do not start with direct OTA integrations. Booking.com and Expedia require partner onboarding. A white-label layer (for example Channex) lets the product focus on UX, AI and Thai-specific work.

## Design

Modernist system in `design-ref/`: Archivo + IBM Plex Sans Thai, 0px radius, 2px rules, **Lacquer Red `#cf1b17`**. Grey weights on the calendar are OTAs; the accent is reserved for direct booking, AI recommendations, and anything that needs the owner now.

## Ecosystem

- **HOTEL24** — accommodation supply and hotel operations  
- **TOUR24** — travel packages  
- **VACATION24** — rooms, tours, transfers together  

HOTEL24 inventory can later publish into TOUR24.

Check Thai trademarks and domains before using the name commercially — “Hotel24” is generic.
