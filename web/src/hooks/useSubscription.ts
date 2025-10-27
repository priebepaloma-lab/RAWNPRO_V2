import { useState, useEffect } from "react";
import type { Subscription } from "@/types/subscription";
import {
  getSubscription,
  hasPremiumAccess,
  getRemainingMessages,
  incrementMessageCount,
} from "@/lib/subscription";

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription>(
    getSubscription()
  );
  const [isPremium, setIsPremium] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(-1);

  const refreshSubscription = () => {
    const sub = getSubscription();
    setSubscription(sub);
    setIsPremium(hasPremiumAccess());
    setRemainingMessages(getRemainingMessages());
  };

  useEffect(() => {
    refreshSubscription();
  }, []);

  const canSendMessage = (): boolean => {
    if (isPremium) return true;
    return remainingMessages > 0;
  };

  const trackMessage = () => {
    if (!isPremium) {
      incrementMessageCount();
      setRemainingMessages(getRemainingMessages());
    }
  };

  return {
    subscription,
    isPremium,
    remainingMessages,
    canSendMessage,
    trackMessage,
    refreshSubscription,
  };
}
