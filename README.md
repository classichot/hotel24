# HOTEL24

**Make your hotel AI-bookable.**

Hotel operating system + AI distribution network for independent hotels, boutique resorts, hostels and villas.

> Connect once. Be discovered by every AI. Take the reservation directly. **Own your guest.**

Today the traveler goes through Booking.com. Tomorrow they ask ChatGPT. HOTEL24 sits underneath:

`Traveler → ChatGPT / Gemini / MCP agent → HOTEL24 Agent Gateway → hotel PMS → Direct booking`

The hotel owns the booking, the payment and the customer. OTAs remain **one channel** inside HOTEL24 — they are not the centre.

## Demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Public agent playground: [http://localhost:3000/agents](http://localhost:3000/agents)
- Hotel identity: [http://localhost:3000/.well-known/hotel24.json](http://localhost:3000/.well-known/hotel24.json)
- Console: [http://localhost:3000/login](http://localhost:3000/login) · `som@baantalay.com` / `demo1234`
- Guest booking page: [http://localhost:3000/book/baantalay](http://localhost:3000/book/baantalay)

Seeded graph: **Baan Talay Boutique Resort** (Ao Nang) plus Chiang Mai boutiques, a hostel and villas.

## Five engines

```
HOTEL24
│
├── HOTEL24 PMS
├── Channel Manager          Booking / Agoda / Trip / Expedia
├── HOTEL24 Direct           hotel website booking
├── HOTEL24 AI Distribution  ChatGPT · Gemini · MCP · UCP · ACP
└── HOTEL24 Revenue AI       pricing / inventory / direct offers
```

**HOTEL24 Agent Direct** is the strategic pillar. Cloudbeds-style PMS is necessary infrastructure. Agent Direct is the differentiator: *what a hotel needs when the guest’s first interface is an AI agent rather than Booking.com.*

## Hotel Agent Protocol (HAP)

Open spec on top of Schema.org, MCP, OpenAI ACP and Google UCP — not a replacement for them.

Every HOTEL24 hotel automatically becomes **AI Agent Ready**:

- `/.well-known/hotel24.json` — identity HOTEL24 defines
- Schema.org JSON-LD, sitemaps, `llms.txt`, OAI-SearchBot rules (**AEO** beside SEO)
- MCP tools at `GET /api/hap/mcp` · invoke `POST /api/hap/invoke`
- ACP-shaped Travel feed at `GET /api/hap/feed` (mapped, not certified)
- Verified registry at `GET /api/hap/registry`

The owner never has to learn those names. They connect HOTEL24 once.

Tools: `search_hotels` · `search_availability` · `get_room_types` · `get_live_rate` · `get_direct_offer` · `get_cancellation_policy` · `compare_rooms` · `create_room_hold` · `create_booking` · `modify_booking` · `cancel_booking` · `get_directions` · `get_facilities` · `ask_hotel` · `get_hotel_identity`

Aliases: `create_quote()` · `hold_room()` · `book_room()`

## Position

Not another OTA. Not primarily “beat Cloudbeds.”

> We don’t own your guests. You do.

Revenue: SaaS subscription + a low AI-direct transaction fee (demo: 1.9%) + payments + premium AI/revenue features.

## Also in the console

White-label OTA channel manager (Channex first). One-button switch from Cloudbeds / Little Hotelier. Thai compliance (passport, TM30, PDPA). Seven house engines: AI GM, Revenue Autopilot, Guest Agent, OTA Reconcile, Reputation → Ops, Migration Agent, Morning Brief.

Do not start with direct OTA integrations. Booking.com Connectivity is paused for new providers. Demand APIs sell travel to travellers — the wrong direction for a PMS.

## Design

Modernist system in `design-ref/`: Archivo + IBM Plex Sans Thai, 0px radius, 2px rules, **Mango orange `#ff6a3c`**. Ink type on orange. Grey weights on the calendar are OTAs; orange is direct booking, AI, and Agent Direct. Green is only a quiet “healthy / synced” status, not the brand.

## Ecosystem

- **HOTEL24** — accommodation supply, hotel operations, AI distribution
- **TOUR24** — travel packages
- **VACATION24** — rooms, tours, transfers together

Check Thai trademarks and domains before using the name commercially — “Hotel24” is generic.
