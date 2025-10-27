import { NextRequest, NextResponse } from "next/server";
import type { KiwifyWebhookPayload } from "@/types/subscription";

/**
 * Webhook da Kiwify para processar eventos de pagamento
 * URL: /api/webhooks/kiwify
 *
 * Configure na Kiwify: https://hook.us2.make.com/m0nyfkfap2j8fsprumxrqa6qqmkew7um
 */
export async function POST(request: NextRequest) {
  try {
    const payload: KiwifyWebhookPayload = await request.json();

    console.log("[Kiwify Webhook] Received:", {
      orderId: payload.order_id,
      status: payload.order_status,
      productId: payload.product_id,
      email: payload.customer.email,
    });

    // Valida se é um evento que nos interessa
    const validStatuses = ["paid", "approved", "completed"];
    if (!validStatuses.includes(payload.order_status.toLowerCase())) {
      console.log("[Kiwify Webhook] Ignoring status:", payload.order_status);
      return NextResponse.json({ received: true, action: "ignored" });
    }

    // Identifica o plano baseado no product_id
    let plan: "mensal" | "lifetime";

    if (payload.product_id.includes("uSs6hgG")) {
      plan = "mensal";
    } else if (payload.product_id.includes("ocIXXfO")) {
      plan = "lifetime";
    } else {
      console.error("[Kiwify Webhook] Unknown product_id:", payload.product_id);
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    // Aqui você pode:
    // 1. Salvar no banco de dados
    // 2. Enviar email de boas-vindas
    // 3. Notificar sistema de analytics
    // 4. etc.

    // Por enquanto, vamos apenas logar
    console.log("[Kiwify Webhook] Subscription activated:", {
      email: payload.customer.email,
      plan,
      orderId: payload.order_id,
    });

    // TODO: Implementar integração com banco de dados quando tiver backend
    // await database.subscriptions.create({
    //   email: payload.customer.email,
    //   plan,
    //   status: "active",
    //   kiwifyOrderId: payload.order_id,
    //   kiwifyCustomerId: payload.customer.email,
    // });

    return NextResponse.json({
      received: true,
      plan,
      orderId: payload.order_id,
    });
  } catch (error) {
    console.error("[Kiwify Webhook] Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// GET não é permitido neste endpoint
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
