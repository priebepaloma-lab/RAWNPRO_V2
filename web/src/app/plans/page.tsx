"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Shield, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { PLANS } from "@/types/subscription";
import { getSubscription, hasPremiumAccess } from "@/lib/subscription";

export default function PlansPage() {
  const router = useRouter();
  const [currentSubscription, setCurrentSubscription] = React.useState(
    getSubscription()
  );
  const isPremium = hasPremiumAccess();

  React.useEffect(() => {
    setCurrentSubscription(getSubscription());
  }, []);

  const handleSelectPlan = (planKey: "mensal" | "lifetime") => {
    const plan = PLANS[planKey];
    if (plan.checkoutUrl) {
      window.location.href = plan.checkoutUrl;
    }
  };

  return (
    <div className="min-h-screen bg-rawn-bg-base text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="text-rawn-text-muted hover:text-white transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-rawn-accent-neon/10 border border-rawn-accent-neon/30 rounded-full px-4 py-2 mb-6">
            <Crown className="text-rawn-accent-neon" size={20} />
            <span className="text-sm font-semibold text-rawn-accent-neon">
              Planos Premium
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Evolua sem limites com{" "}
            <span className="text-rawn-accent-neon">RAWN PRO</span>
          </h1>

          <p className="text-lg text-rawn-text-muted max-w-2xl mx-auto">
            Acesso ilimitado à inteligência de performance humana. Escolha o
            plano ideal para sua jornada.
          </p>

          {isPremium && (
            <div className="mt-6 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
              <Check className="text-green-500" size={18} />
              <span className="text-sm font-medium text-green-500">
                Você já tem acesso premium
              </span>
            </div>
          )}
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Mensal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-rawn-bg-surface border border-white/10 rounded-2xl p-8 hover:border-rawn-accent-neon/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rawn-accent-neon/10 rounded-xl">
                <Zap className="text-rawn-accent-neon" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mensal</h3>
                <p className="text-sm text-rawn-text-muted">
                  Flexibilidade mensal
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$ 49,90</span>
                <span className="text-rawn-text-muted">/mês</span>
              </div>
              <p className="text-sm text-rawn-text-muted mt-1">
                Primeira cobrança: R$ 19,90
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.mensal.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check
                    className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan("mensal")}
              disabled={currentSubscription.plan === "mensal"}
              className="w-full bg-rawn-accent-neon text-black font-bold py-4 rounded-full hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSubscription.plan === "mensal"
                ? "Plano Atual"
                : "Assinar Agora"}
            </button>
          </motion.div>

          {/* Plano Lifetime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-br from-rawn-accent-neon/10 to-purple-500/10 border-2 border-rawn-accent-neon rounded-2xl p-8"
          >
            {/* Badge "Melhor Valor" */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-rawn-accent-neon text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-neon-glow">
                🔥 MELHOR VALOR
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rawn-accent-neon/20 rounded-xl">
                <Crown className="text-rawn-accent-neon" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Lifetime</h3>
                <p className="text-sm text-rawn-accent-neon font-semibold">
                  Acesso vitalício
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$ 299,00</span>
              </div>
              <p className="text-sm text-rawn-accent-neon mt-1 font-medium">
                Pagamento único • Sem mensalidades
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.lifetime.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Sparkles
                    className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan("lifetime")}
              disabled={currentSubscription.plan === "lifetime"}
              className="w-full bg-rawn-accent-neon text-black font-bold py-4 rounded-full hover:brightness-110 shadow-neon-glow hover:shadow-neon-intense transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSubscription.plan === "lifetime"
                ? "Plano Atual"
                : "Garantir Acesso Vitalício"}
            </button>
          </motion.div>
        </div>

        {/* FAQ / Garantia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-rawn-bg-surface border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-rawn-accent-neon" size={28} />
              <h3 className="text-xl font-bold">Garantia de 7 dias</h3>
            </div>

            <p className="text-rawn-text-muted leading-relaxed">
              Experimente o RAWN PRO sem riscos. Se não ficar satisfeito,
              devolvemos 100% do seu investimento em até 7 dias. Simples assim.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
