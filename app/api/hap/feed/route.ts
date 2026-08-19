import { NextResponse } from "next/server";
import { HAP_HOTELS, directOffer } from "@/lib/hap";

/** ACP-shaped merchant feed — Travel. Hotel is the merchant of record. */
export function GET() {
  const items = HAP_HOTELS.flatMap((h) =>
    h.roomsTypes.map((r) => {
      const offer = directOffer(h, r);
      return {
        id: `${h.id}:${r.id}`,
        type: "travel.lodging",
        merchant: h.name,
        merchantId: h.id,
        title: `${h.name} · ${r.en}`,
        price: { value: r.rate, currency: "THB" },
        availability: r.avail > 0 ? "in_stock" : "out_of_stock",
        checkout_url: h.website,
        attributes: {
          city: h.city,
          area: h.area,
          breakfast: h.breakfast,
          parking: h.parking,
          cancellation: h.cancel.en,
          inclusions: offer.inclusions,
        },
      };
    })
  );
  return NextResponse.json(
    { protocol: "acp-inspired", category: "Travel", merchant_of_record: "hotel", items },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
