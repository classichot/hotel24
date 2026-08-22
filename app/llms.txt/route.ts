import { HAP_HOTELS, HAP_TOOLS, HAP_VERSION } from "@/lib/hap";

export function GET() {
  const body = [
    `# HOTEL24 — Agent Engine Optimization`,
    `# Hotel Agent Protocol ${HAP_VERSION}`,
    ``,
    `HOTEL24 makes independent hotels AI-bookable.`,
    `RevenueOS is the autonomous commercial department: 16 engines calculate, Guardian blocks bad writes (Suite 500 THB, sell limit 52), execution changes rates.`,
    `Traveler → ChatGPT / Gemini / MCP agent → HOTEL24 Agent Gateway → hotel PMS → Direct booking.`,
    `The hotel owns the guest. Booking.com does not have to be involved.`,
    ``,
    `Identity: /.well-known/hotel24.json`,
    `Registry: GET /api/hap/registry`,
    `Tools: POST /api/hap/invoke  { "tool": "search_hotels", "arguments": { ... } }`,
    `MCP: GET /api/hap/mcp`,
    `Feed: GET /api/hap/feed`,
    `Playground: /agents`,
    ``,
    `Tools:`,
    ...HAP_TOOLS.map((t) => `- ${t.name}: ${t.description}`),
    ``,
    `Verified hotels:`,
    ...HAP_HOTELS.map((h) => `- ${h.id} ${h.name} (${h.area}, ${h.city})`),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" },
  });
}
