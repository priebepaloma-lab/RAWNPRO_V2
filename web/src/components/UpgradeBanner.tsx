"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";

export default function UpgradeBanner() {
  const router = useRouter();
  const { isPremium, remainingMessages } = useSubscription();
  const [dismissed, setDismissed] = React.useState(false);

  // Não mostrar se já é premium ou foi dismissed
  if (isPremium || dismissed) return null;

  // Mostrar aviso quando restam poucas mensagens
  const isLowOnMessages = remainingMessages >= 0 && remainingMessages <= 3;

  if (!isLowOnMessages) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative bg-gradient-to-r from-rawn-accent-neon/10 to-purple-500/10 border-b border-rawn-accent-neon/30"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex p-2 bg-rawn-accent-neon/20 rounded-lg">
              <Crown className="text-rawn-accent-neon" size={20} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {remainingMessages === 0 ? (
                  "Você atingiu o limite de mensagens gratuitas hoje"
                ) : (
                  <>
                    Restam apenas{" "}
                    <span className="text-rawn-accent-neon">
                      {remainingMessages}
                    </span>{" "}
                    mensagens gratuitas
                  </>
                )}
              </p>
              <p className="text-xs text-rawn-text-muted">
                Desbloqueie mensagens ilimitadas com RAWN PRO
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/plans")}
              className="flex items-center gap-2 bg-rawn-accent-neon text-black px-4 py-2 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-neon-glow whitespace-nowrap"
            >
              <Sparkles size={16} />
              Fazer Upgrade
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 text-rawn-text-muted hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
