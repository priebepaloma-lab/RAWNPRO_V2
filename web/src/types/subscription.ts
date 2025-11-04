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
  stripeSessionId?: string;
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
    checkoutUrl: "",
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
    price: 449.9,
    checkoutUrl: "",
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
