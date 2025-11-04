import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAppUrl(request: Request) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && envUrl.length > 0) return envUrl.replace(/\/$/, "");
  const host = (
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    ""
  ).toString();
  const proto = (request.headers.get("x-forwarded-proto") || "http").toString();
  return `${proto}://${host}`;
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

const PLAN_PRICE_MAP: Record<string, string | undefined> = {
  mensal: process.env.STRIPE_PRICE_MENSAL,
  lifetime: process.env.STRIPE_PRICE_LIFETIME,
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const plan = body?.plan as "mensal" | "lifetime" | undefined;

    if (!plan || !["mensal", "lifetime"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId = PLAN_PRICE_MAP[plan];
    if (!priceId) {
      return NextResponse.json(
        { error: `Missing Stripe price id for plan ${plan}` },
        { status: 500 }
      );
    }

    const stripe = getStripe();

    const appUrl = getAppUrl(request);

    const successUrl = `${appUrl}/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${appUrl}/plans`;

    const mode = plan === "mensal" ? "subscription" : "payment";

    const payload: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Helpful to identify the plan in webhooks
      metadata: { plan },
      // Do not set customer_creation in subscription mode; Stripe errors otherwise
      // Recommended for Brazilian cards; adjust as needed
      locale: "pt-BR",
      automatic_tax: { enabled: false },
    };

    // Apply intro promo for first month of mensal plan using a coupon OR promotion code
    if (plan === "mensal") {
      const couponId = process.env.STRIPE_COUPON_MENSAL_FIRST_MONTH;
      const promoCodeId = process.env.STRIPE_PROMO_MENSAL_FIRST_MONTH;
      if (promoCodeId) {
        payload.discounts = [{ promotion_code: promoCodeId }];
      } else if (couponId) {
        payload.discounts = [{ coupon: couponId }];
      }
    }

    const session = await stripe.checkout.sessions.create(payload);

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("[Stripe] create-checkout-session error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
