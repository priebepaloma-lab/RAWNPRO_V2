# Deploy to Vercel (Production) with Stripe Live

This playbook helps you publish the app to Vercel with live Stripe and validate a real checkout.

## 1) Prerequisites

- Vercel project linked to this repo
- Stripe account with LIVE mode enabled
- Two Stripe Prices created:
  - Recurring (Monthly, BRL) → STRIPE_PRICE_MENSAL
  - One-time (Lifetime, BRL) → STRIPE_PRICE_LIFETIME
- First-month promo for Monthly:
  - Create a Coupon (amount_off=2000 BRL, duration=once), get its ID → STRIPE_COUPON_MENSAL_FIRST_MONTH
  - Or create a Promotion Code and use → STRIPE_PROMO_MENSAL_FIRST_MONTH

## 2) Required Environment Variables (Production)

Set these in Vercel → Project → Settings → Environment Variables (PRODUCTION):

- NEXT_PUBLIC_APP_URL = https://rawn-pro.vercel.app
- STRIPE*SECRET_KEY = sk_live*...
- STRIPE*WEBHOOK_SECRET = whsec*... (from Stripe Webhooks)
- STRIPE*PRICE_MENSAL = price*...
- STRIPE*PRICE_LIFETIME = price*...
- STRIPE_COUPON_MENSAL_FIRST_MONTH = Ah3bms82 (or your live coupon id)
- (Optional) STRIPE*PROMO_MENSAL_FIRST_MONTH = promo*...
- (Optional) NEXT_PUBLIC_STRIPE_REQUIRED = true (enforce Stripe-only)

Tip: You can keep TEST keys in Preview env and LIVE keys in Production.

## 3) Configure Stripe Webhook (LIVE)

- Endpoint URL: https://rawn-pro.vercel.app/api/stripe/webhook
- Events: checkout.session.completed, invoice.payment_succeeded, customer.subscription.deleted (or use “Send all events” for easier debugging)
- Copy the “Signing secret” (whsec\_...) to STRIPE_WEBHOOK_SECRET in Vercel Production env

## 4) Deploy

- Commit and push to main (or trigger a production deploy from Vercel)
- Or via CLI:

```powershell
# Install Vercel CLI (one-time)
npm i -g vercel

# Login (opens browser)
vercel login

# Link the project to Vercel (one-time per machine)
vercel link

# Trigger a production deployment
vercel --prod
```

## 5) Validate in Production

- Open https://rawn-pro.vercel.app (hard refresh)
- Go to /api/health/stripe → expect `{ ok: true }`
- Visit /plans → buttons should open Stripe Checkout
- Monthly: first charge R$ 29,90 (promo), then R$ 49,90/mês
- Lifetime: R$ 449,90 one-time
- Complete a real payment (LIVE card) to test. Verify in Stripe Dashboard → Payments and Subscriptions.

## 6) Logs and Troubleshooting

- Vercel → Project → Deployments → View Logs → serverless logs will show Stripe webhook events
- If /api/health/stripe is not ok:
  - Check env names/values in Vercel Production
  - Redeploy after env changes
- If /plans doesn't open Stripe Checkout:
  - Set NEXT_PUBLIC_STRIPE_REQUIRED=true to enforce Stripe-only and fail fast if envs are missing
