"use client";

import React from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw } from "lucide-react";
import { useProfile } from "@/app/profile/ProfileContext";

type Props = {
  role: "user" | "system";
  text: string;
  // ações opcionais para respostas do assistente
  onRegenerate?: () => void;
  isLast?: boolean;
};

export default function MessageBubble({
  role,
  text,
  onRegenerate,
  isLast,
}: Props) {
  const { profile } = useProfile();

  // mensagem de sistema especial (feedback de limpeza)
  if (role === "system" && text.toLowerCase().includes("apagado")) {
    return (
      <motion.div
        className="text-center text-neutral-400 italic py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.div>
    );
  }

  const isUser = role === "user";

  // Adaptação de tom para respostas do sistema
  let displayText = text;
  if (role === "system" && profile?.style) {
    if (profile.style === "humano" || profile.style === "humanizado") {
      displayText = displayText + " 😊";
    } else if (profile.style === "técnico") {
      displayText = displayText.replace(/\!+/g, ".");
    } else if (profile.style === "sintético") {
      displayText = displayText.replace(
        /(.+?)([.!?])?$/,
        (_m: string, p: string) => p + "."
      );
    }
  }

  const isLong = (displayText ?? "").length > 800;
  const [expanded, setExpanded] = React.useState(false);
  const shownText =
    isLong && !expanded ? displayText.slice(0, 800) + "…" : displayText;
  const canActions = role === "system";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(displayText);
    } catch {
      // ignore
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.6 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      role="listitem"
      aria-label={isUser ? "Mensagem do usuário" : "Mensagem do sistema"}
    >
      <div
        className={[
          "max-w-[78%] rounded-2xl px-4 py-2 text-sm shadow-sm",
          isUser
            ? "bg-[#00FF9C] text-black rounded-br-md"
            : "bg-[#EAF8F5] text-black rounded-bl-md",
        ].join(" ")}
      >
        {isUser && profile?.name ? (
          <span className="block text-xs font-semibold text-right text-neutral-700 mb-1">
            {profile.name}
          </span>
        ) : null}
        <div className="whitespace-pre-wrap leading-relaxed">{shownText}</div>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-semibold text-emerald-700 hover:underline focus:outline-none"
            aria-expanded={expanded}
          >
            {expanded ? "mostrar menos" : "mostrar mais"}
          </button>
        )}
        {canActions && (
          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-700">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 bg-white/70 hover:bg-white transition-colors"
              aria-label="Copiar resposta"
            >
              <Copy size={14} /> copiar
            </button>
            {isLast && onRegenerate && (
              <button
                type="button"
                onClick={onRegenerate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 bg-white/70 hover:bg-white transition-colors"
                aria-label="Regenerar resposta"
              >
                <RefreshCw size={14} /> regenerar
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
