"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateSubscription } from "@/lib/subscription";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activated, setActivated] = React.useState(false);

  React.useEffect(() => {
    // Stripe Checkout retorna session_id e plan
    const stripeSessionId = searchParams.get("session_id");
    const plan = searchParams.get("plan") as "mensal" | "lifetime" | null;

    if (plan && stripeSessionId) {
      activateSubscription(plan, { stripeSessionId });
      setActivated(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-rawn-bg-base text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6"
        >
          <CheckCircle2 className="text-green-500" size={48} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Pagamento Confirmado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-rawn-text-muted mb-8"
        >
          Seu acesso premium ao RAWN PRO foi ativado com sucesso.
          <br />
          Agora você tem mensagens ilimitadas! 🎉
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-rawn-bg-surface border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-rawn-accent-neon" size={24} />
            <h3 className="text-xl font-semibold">Próximos Passos</h3>
          </div>

          <ul className="text-left space-y-3 text-rawn-text-muted">
            <li className="flex items-start gap-3">
              <ArrowRight
                className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                size={18}
              />
              <span>Comece a conversar sem limites</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight
                className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                size={18}
              />
              <span>Configure seu perfil para respostas personalizadas</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight
                className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                size={18}
              />
              <span>Acesse recursos exclusivos e atualizações</span>
            </li>
          </ul>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push("/")}
          className="w-full bg-rawn-accent-neon text-black font-bold py-4 rounded-full hover:brightness-110 shadow-neon-glow hover:shadow-neon-intense transition-all"
        >
          Começar Agora
        </motion.button>

        <p className="mt-6 text-sm text-rawn-text-muted">
          Recebeu um email de confirmação com os detalhes da sua assinatura.
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-rawn-bg-base text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rawn-accent-neon mx-auto mb-4"></div>
            <p className="text-rawn-text-muted">Carregando...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
