import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Do NOT expose values; only presence booleans
  const has = (v: string | undefined) => Boolean(v && v.length > 0);

  const summary = {
    NEXT_PUBLIC_APP_URL: has(process.env.NEXT_PUBLIC_APP_URL),
    NEXT_PUBLIC_STRIPE_REQUIRED: has(process.env.NEXT_PUBLIC_STRIPE_REQUIRED)
      ? process.env.NEXT_PUBLIC_STRIPE_REQUIRED
      : "(not set)",
    STRIPE_SECRET_KEY: has(process.env.STRIPE_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET: has(process.env.STRIPE_WEBHOOK_SECRET),
    STRIPE_PRICE_MENSAL: has(process.env.STRIPE_PRICE_MENSAL),
    STRIPE_PRICE_LIFETIME: has(process.env.STRIPE_PRICE_LIFETIME),
    STRIPE_COUPON_OR_PROMO:
      has(process.env.STRIPE_PROMO_MENSAL_FIRST_MONTH) ||
      has(process.env.STRIPE_COUPON_MENSAL_FIRST_MONTH),
  } as const;

  const ok = Object.values(summary).every((v) =>
    typeof v === "string" ? v.length > 0 : Boolean(v)
  );

  return NextResponse.json({ ok, summary });
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
