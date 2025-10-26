"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/components/ToastProvider";

export default function ConsentPage() {
  const router = useRouter();
  const [accepted, setAccepted] = React.useState(false);
  const toast = useToast();

  const handleAccept = () => {
    if (!accepted) return;

    // Persiste consentimento no localStorage
    localStorage.setItem("consentAccepted", "true");
    localStorage.setItem("consentDate", new Date().toISOString());

    try {
      toast.success("Consentimento registrado");
    } catch {}

    // Redireciona para o perfil
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-rawn-bg-base flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Termos e Políticas
          </h1>
          <p className="text-sm text-rawn-text-secondary">
            Para continuar, é necessário aceitar nossos termos de uso e
            políticas de privacidade
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-lg border border-white/15 bg-[#4A4A4A] p-6 mb-6">
          <div className="space-y-4 text-sm text-white/90">
            <p>
              O <strong className="text-white">RAWN PRO</strong> é um sistema de
              inteligência aplicada à performance humana com caráter
              exclusivamente educacional.
            </p>
            <p>Ao utilizar o aplicativo, você declara estar ciente de que:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-white/90">
              <li>Todo conteúdo tem finalidade educacional, não clínica</li>
              <li>
                O sistema não substitui acompanhamento profissional
                especializado
              </li>
              <li>
                As orientações são gerais e devem ser aplicadas sob seu próprio
                julgamento
              </li>
              <li>
                Seus dados são armazenados localmente no dispositivo e não são
                compartilhados
              </li>
            </ul>
            <div className="pt-4 border-t border-white/15">
              <p className="text-xs text-white/70">
                Para mais detalhes, consulte:
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Link
                  href="/terms"
                  className="text-xs text-rawn-accent-neon hover:brightness-110 underline transition-colors"
                >
                  Termos de Uso
                </Link>
                <Link
                  href="/privacy"
                  className="text-xs text-rawn-accent-neon hover:brightness-110 underline transition-colors"
                >
                  Política de Privacidade
                </Link>
                <Link
                  href="/disclaimer"
                  className="text-xs text-rawn-accent-neon hover:brightness-110 underline transition-colors"
                >
                  Aviso de Responsabilidade
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/30 bg-transparent checked:bg-rawn-accent-neon checked:border-rawn-accent-neon focus:ring-2 focus:ring-rawn-accent-neon focus:ring-offset-2 focus:ring-offset-rawn-bg-base cursor-pointer transition-all"
          />
          <span className="text-sm text-white/85 group-hover:text-white transition-colors">
            Concordo com os Termos de Uso, Política de Privacidade e Aviso de
            Responsabilidade do RAWN PRO
          </span>
        </label>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: accepted ? 1.02 : 1 }}
          whileTap={{ scale: accepted ? 0.98 : 1 }}
          onClick={handleAccept}
          disabled={!accepted}
          className={[
            "w-full rounded-pill px-8 py-4 text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rawn-bg-base",
            accepted
              ? "bg-rawn-accent-neon text-black shadow-neon-glow hover:shadow-neon-focus hover:brightness-110 focus:ring-rawn-accent-neon cursor-pointer"
              : "bg-rawn-bg-surface text-rawn-text-muted cursor-not-allowed opacity-50",
          ].join(" ")}
        >
          Aceitar e continuar
        </motion.button>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/welcome"
            className="text-xs text-rawn-text-muted hover:text-rawn-text-secondary underline transition-colors"
          >
            Voltar
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
