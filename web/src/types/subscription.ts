export type SubscriptionPlan = "free" | "mensal" | "lifetime";

export type SubscriptionStatus =
  | "active"
  | "inactive"
  | "cancelled"
  | "expired"
  | "trial";

export interface Subscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  expiresAt?: number; // timestamp
  kiwifyOrderId?: string;
  kiwifyCustomerId?: string;
}

export interface KiwifyWebhookPayload {
  order_id: string;
  order_status: string;
  product_id: string;
  customer: {
    email: string;
    name: string;
    phone?: string;
  };
  order_date: string;
  approved_date?: string;
  product_name: string;
  product_type: "subscription" | "one_time";
  subscription_status?: "active" | "cancelled" | "expired";
}

export const PLANS = {
  free: {
    name: "Gratuito",
    price: 0,
    messagesPerDay: 10,
    features: ["10 mensagens por dia", "Acesso básico ao chat"],
  },
  mensal: {
    name: "Mensal",
    price: 49.9,
    checkoutUrl: "https://pay.kiwify.com.br/uSs6hgG",
    messagesPerDay: -1, // ilimitado
    features: [
      "Mensagens ilimitadas",
      "Acesso completo ao RAWN PRO",
      "Suporte prioritário",
      "Atualizações contínuas",
    ],
  },
  lifetime: {
    name: "Lifetime",
    price: 299.0,
    checkoutUrl: "https://pay.kiwify.com.br/ocIXXfO",
    messagesPerDay: -1, // ilimitado
    features: [
      "Acesso vitalício",
      "Mensagens ilimitadas",
      "Todos os recursos premium",
      "Suporte prioritário",
      "Atualizações para sempre",
    ],
  },
} as const;
