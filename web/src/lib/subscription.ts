import type {
  Subscription,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/types/subscription";

const STORAGE_KEY = "rawn_subscription";

// IDs dos produtos na Kiwify
export const KIWIFY_PRODUCT_IDS = {
  mensal: "uSs6hgG",
  lifetime: "ocIXXfO",
} as const;

/**
 * Obtém a assinatura do usuário do localStorage
 */
export function getSubscription(): Subscription {
  if (typeof window === "undefined") {
    return { plan: "free", status: "inactive" };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { plan: "free", status: "inactive" };
    }

    const sub = JSON.parse(stored) as Subscription;

    // Verifica se expirou
    if (sub.expiresAt && sub.expiresAt < Date.now()) {
      sub.status = "expired";
    }

    return sub;
  } catch {
    return { plan: "free", status: "inactive" };
  }
}

/**
 * Salva a assinatura do usuário
 */
export function saveSubscription(subscription: Subscription): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  } catch (error) {
    console.error("Error saving subscription:", error);
  }
}

/**
 * Verifica se o usuário tem acesso premium (mensal ou lifetime ativo)
 */
export function hasPremiumAccess(): boolean {
  const sub = getSubscription();

  if (sub.plan === "free") return false;
  if (sub.status !== "active") return false;

  // Lifetime não expira
  if (sub.plan === "lifetime") return true;

  // Mensal verifica expiração
  if (sub.plan === "mensal" && sub.expiresAt) {
    return sub.expiresAt > Date.now();
  }

  return false;
}

/**
 * Verifica limite de mensagens
 * @returns número de mensagens restantes (-1 = ilimitado)
 */
export function getRemainingMessages(): number {
  const sub = getSubscription();

  // Premium tem mensagens ilimitadas
  if (hasPremiumAccess()) {
    return -1;
  }

  // Free: 10 mensagens por dia
  const today = new Date().toDateString();
  const messagesKey = `messages_${today}`;
  const used = parseInt(localStorage.getItem(messagesKey) || "0", 10);

  return Math.max(0, 10 - used);
}

/**
 * Incrementa contador de mensagens do plano free
 */
export function incrementMessageCount(): void {
  if (hasPremiumAccess()) return;

  const today = new Date().toDateString();
  const messagesKey = `messages_${today}`;
  const used = parseInt(localStorage.getItem(messagesKey) || "0", 10);

  localStorage.setItem(messagesKey, String(used + 1));
}

/**
 * Limpa dados de assinatura (logout/reset)
 */
export function clearSubscription(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Ativa assinatura após compra bem-sucedida
 */
export function activateSubscription(
  plan: SubscriptionPlan,
  kiwifyOrderId: string,
  kiwifyCustomerId: string
): void {
  const subscription: Subscription = {
    plan,
    status: "active",
    kiwifyOrderId,
    kiwifyCustomerId,
  };

  // Mensal expira em 30 dias
  if (plan === "mensal") {
    subscription.expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  }

  saveSubscription(subscription);
}
