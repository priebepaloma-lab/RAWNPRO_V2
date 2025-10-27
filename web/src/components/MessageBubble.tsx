"use client";

import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
        className="text-center text-rawn-text-muted italic py-2"
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

  // Detecta se é conteúdo instrutivo (tem estrutura, listas, ou é longo)
  const isInstructionalContent =
    !isUser &&
    (displayText.length > 200 ||
      /(\n-|\n\d+\.|#{1,4}\s|Objetivo:|Estrutura:|Diretrizes:|Fontes:)/i.test(
        displayText
      ));

  // Detecta tópicos sensíveis (medicação, hormônios, etc.) para reforçar aviso
  const isSensitiveTopic =
    !isUser &&
    /(monjaro|mounjaro|ozempic|semaglutida|liraglutida|tirzepatida|saxenda|rem[eé]dio|medicamento|anabol|esteroide|horm[oô]nio|\btrt\b|cortic[oó]ide|corticosteroide|benzodiazep|antidepressivo|anticoncepcional|hgh|insulina)/i.test(
      displayText
    );

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
          "max-w-[78%] px-4 py-2.5 text-sm shadow-sm",
          isUser
            ? "bg-[#00FF9C] text-black rounded-2xl rounded-br-sm"
            : "bg-[#4A4A4A] text-white rounded-2xl rounded-bl-sm prose prose-invert max-w-none [&>div]:!leading-relaxed",
        ].join(" ")}
      >
        {isUser && profile?.name ? (
          <span className="block text-xs font-semibold text-right text-neutral-700 mb-1">
            {profile.name}
          </span>
        ) : null}
        <div className="prose-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h3 className="!font-semibold !text-[1.0625rem] !mt-3 !mb-2 !leading-tight">
                  {children}
                </h3>
              ),
              h2: ({ children }) => (
                <h3 className="!font-semibold !text-[1rem] !mt-2.5 !mb-1.5 !leading-tight">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4 className="!font-semibold !text-[0.9375rem] !mt-2 !mb-1.5 !leading-tight">
                  {children}
                </h4>
              ),
              h4: ({ children }) => (
                <h5 className="!font-semibold !text-[0.875rem] !mt-2 !mb-1 !leading-tight">
                  {children}
                </h5>
              ),
              p: ({ children }) => (
                <p className="!my-2 !leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="!list-disc !pl-5 !space-y-0.5 !my-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="!list-decimal !pl-5 !space-y-0.5 !my-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="!my-0.5 !leading-relaxed">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="!font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="!italic">{children}</em>,
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!text-rawn-accent-neon !underline !font-medium hover:!text-rawn-accent-lime !transition-colors"
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="!rounded !bg-white/20 !px-1.5 !py-0.5 !text-[0.9em] !font-mono">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="!border-l-4 !border-white/30 !pl-4 !italic !my-3">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="!border-white/20 !my-4" />,
            }}
          >
            {shownText}
          </ReactMarkdown>
        </div>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-semibold text-rawn-accent-neon hover:underline focus:outline-none"
            aria-expanded={expanded}
          >
            {expanded ? "mostrar menos" : "mostrar mais"}
          </button>
        )}
        {(isInstructionalContent || isSensitiveTopic) && (
          <div className="mt-3 border-t border-white/20 pt-2 text-[11px] italic text-white/70">
            Conteúdo educativo. Medicamentos e terapias exigem prescrição e
            acompanhamento médico. Não inicie, suspenda ou ajuste doses sem
            orientação profissional. Se sentir dor, desconforto ou agravamento
            de sintomas, procure um especialista.
          </div>
        )}
        {canActions && (
          <div className="mt-2 flex items-center gap-2 text-xs text-white/90">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Copiar resposta"
            >
              <Copy size={14} /> copiar
            </button>
            {isLast && onRegenerate && (
              <button
                type="button"
                onClick={onRegenerate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 bg-white/10 hover:bg-white/20 transition-colors"
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
