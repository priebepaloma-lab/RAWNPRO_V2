"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";

// Minimal local composer for the widget (not fixed to viewport)
function WidgetComposer({
  onSend,
  disabled,
}: {
  onSend: (t: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = React.useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = text.trim();
    if (!v || disabled) return;
    onSend(v);
    setText("");
  }
  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 border-t border-white/10 bg-black/60 p-2"
    >
      <input
        className="flex-1 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-white placeholder:text-white/40 focus:border-emerald-400/60 outline-none"
        placeholder="Escreva sua mensagem..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ fontSize: 16 }}
      />
      <button
        type="submit"
        disabled={!text.trim() || !!disabled}
        className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-300 disabled:opacity-50"
      >
        Enviar
      </button>
    </form>
  );
}

export default function LeadChatWidget() {
  type Msg = { id: string; role: "user" | "system"; text: string };
  const MAX_MESSAGES = 20;
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      id: "welcome",
      role: "system",
      text: "Bem-vindo(a)! Sou especialista do RAWN PRO. Posso entender sua situação (rotina, tempo e objetivo) para te orientar sobre o melhor plano?",
    },
  ]);
  const [typing, setTyping] = React.useState(false);
  const [showPlanPicker, setShowPlanPicker] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  function appendSystem(text: string) {
    const sysId = Math.random().toString(36).slice(2);
    setMessages((prev) => [...prev, { id: sysId, role: "system", text }]);
  }

  async function createCheckout(plan: "mensal" | "lifetime") {
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { url?: string };
      if (data?.url) {
        appendSystem(
          `Perfeito — aqui está seu checkout ${
            plan === "mensal" ? "Mensal" : "Vitalício"
          }:\n${
            data.url
          }\n\nAbra o link para concluir com segurança pela Stripe. Garantia de 7 dias, cancelamento simples.`
        );
      } else {
        throw new Error("Link de checkout indisponível no momento.");
      }
    } catch (e: any) {
      appendSystem(
        e?.message
          ? `Desculpe, não consegui gerar o checkout agora: ${e.message}`
          : "Desculpe, não consegui gerar o checkout agora. Tente novamente em instantes."
      );
    }
  }

  function detectIntent(
    text: string
  ): { intent: "buy"; plan?: "mensal" | "lifetime" } | { intent: "other" } {
    const t = text.toLowerCase();
    const wants =
      /(comprar|assinar|assino|assinei|quero|ativar|contratar)/i.test(t);
    if (!wants) return { intent: "other" };
    const mensal = /(mensal|mês|mesal)/i.test(t);
    const vital = /(vital[ií]cio|vitalicio|lifetime)/i.test(t);
    if (mensal && !vital) return { intent: "buy", plan: "mensal" };
    if (vital && !mensal) return { intent: "buy", plan: "lifetime" };
    return { intent: "buy" };
  }

  async function handleSend(text: string) {
    // Limite duro de 20 mensagens totais
    if (messages.length >= MAX_MESSAGES) {
      appendSystem(
        "Vamos finalizar para não ultrapassar nosso limite. Posso te levar direto ao checkout? Escolha: Mensal (R$ 29,90 no 1º mês, depois R$ 49,90/mês) ou Vitalício (R$ 449,90)."
      );
      setShowPlanPicker(true);
      return;
    }

    const id = Math.random().toString(36).slice(2);
    setMessages((prev) => [...prev, { id, role: "user", text }]);
    setTyping(true);

    // Detecta intenção de compra e plano
    const intent = detectIntent(text);
    if (intent.intent === "buy") {
      if (intent.plan) {
        await createCheckout(intent.plan);
        setTyping(false);
        return;
      }
      // Pergunta escolha de plano
      appendSystem(
        "Perfeito! Você prefere o Mensal (R$ 29,90 no 1º mês; depois R$ 49,90/mês) ou o Vitalício (R$ 449,90)?"
      );
      setShowPlanPicker(true);
      setTyping(false);
      return;
    }

    // Prepare last 20 msgs
    const history = [...messages, { id, role: "user" as const, text }].slice(
      -20
    );
    const payload = {
      messages: history.map((m) => ({ role: m.role, content: m.text })),
      profile: {},
      mode: "lead-spin",
      leadMeta: {
        turn: history.length + 1,
        remaining: MAX_MESSAGES - (history.length + 1),
        max: MAX_MESSAGES,
      },
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        throw new Error(err?.details || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { role: "system"; content: string };
      const sysId = Math.random().toString(36).slice(2);
      setMessages((prev) => [
        ...prev,
        { id: sysId, role: "system", text: data.content },
      ]);
    } catch (e: any) {
      const errId = Math.random().toString(36).slice(2);
      setMessages((prev) => [
        ...prev,
        {
          id: errId,
          role: "system",
          text: e?.message
            ? `Desculpe, ocorreu um erro: ${e.message}`
            : "Desculpe, ocorreu um erro ao responder.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-3 text-black shadow-lg hover:bg-emerald-300 focus:outline-none"
      >
        <MessageSquare size={18} /> Conversar
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 sm:inset-auto sm:bottom-6 sm:right-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop on mobile */}
            <div
              className="absolute inset-0 bg-black/40 sm:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 h-[80vh] rounded-t-2xl border-t border-white/10 bg-black sm:static sm:h-[560px] sm:w-[380px] sm:rounded-2xl sm:border"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <div className="text-sm font-semibold text-white">
                  RAWN PRO • Chat
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded p-1 text-white/70 hover:bg-white/10"
                  aria-label="Fechar"
                >
                  <X size={16} />
                </button>
              </div>

              <div
                ref={panelRef}
                className="flex h-[calc(100%-92px)] flex-col overflow-y-auto px-3 py-3"
              >
                <section className="space-y-2" role="log" aria-live="polite">
                  {messages.map((m, idx) => (
                    <MessageBubble
                      key={m.id}
                      role={m.role}
                      text={m.text}
                      isLast={idx === messages.length - 1}
                    />
                  ))}
                </section>
                {typing && (
                  <div className="pt-2">
                    <TypingIndicator />
                  </div>
                )}
                {/* CTA de fechamento quando perto do limite ou quando usuário quer comprar */}
                {(showPlanPicker || messages.length >= MAX_MESSAGES - 3) && (
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-200">
                    <div className="mb-2 font-semibold">Escolha seu plano</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => createCheckout("mensal")}
                        className="rounded-full bg-emerald-400 px-4 py-2 font-bold text-black hover:bg-emerald-300"
                      >
                        Mensal
                      </button>
                      <button
                        type="button"
                        onClick={() => createCheckout("lifetime")}
                        className="rounded-full border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10"
                      >
                        Vitalício
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-white/70">
                      Pagamento seguro pela Stripe • Garantia de 7 dias •
                      Cancelamento simples
                    </div>
                  </div>
                )}
              </div>

              <WidgetComposer onSend={handleSend} disabled={typing} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
