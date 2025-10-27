"use client";

import React from "react";
import { useProfile } from "@/app/profile/ProfileContext";
import HeaderRAWN from "@/components/HeaderRAWN";
import MessageBubble from "@/components/MessageBubble";
import ChatComposer from "@/components/ChatComposer";
import InstallPrompt from "@/components/InstallPrompt";
import { motion } from "framer-motion";
import TypingIndicator from "@/components/TypingIndicator";
import { useToast } from "@/components/ToastProvider";

type Msg = { id: string; role: "user" | "system"; text: string };

type Props = {
  initialMessages?: Msg[];
};

export default function LayoutChat({ initialMessages = [] }: Props) {
  const [messages, setMessages] = React.useState<Msg[]>(initialMessages);
  const [isTyping, setIsTyping] = React.useState(false);
  const { profile } = useProfile();
  const toast = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // chave de armazenamento local
  const STORAGE_KEY = "rawn.chat.history";

  // Auto-scroll para a última mensagem
  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  // Scroll quando mensagens mudam
  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // carrega histórico persistido ao montar
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[];
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }

      // Mensagem automática após salvar o perfil
      const justSaved = localStorage.getItem("profileSaved");
      if (justSaved) {
        const sysId = Math.random().toString(36).slice(2);
        setMessages((prev) => [
          ...prev,
          {
            id: sysId,
            role: "system",
            text: "Tudo pronto. Suas orientações agora estão ajustadas ao seu perfil.",
          },
        ]);
        localStorage.removeItem("profileSaved");
      }
    } catch {
      // falha silenciosa para não quebrar a UI
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sincroniza sempre que mensagens mudarem
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  async function handleSend(text: string) {
    const value = text.trim();

    // comando /limpar (case-insensitive)
    if (/^\/limpar\b/i.test(value)) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      const sysId = Date.now().toString();
      setMessages([
        { id: sysId, role: "system", text: "Histórico apagado com sucesso." },
      ]);
      setIsTyping(false);
      return;
    }

    const id = Math.random().toString(36).slice(2);
    setMessages((prev) => [...prev, { id, role: "user", text: value }]);

    try {
      // Limita histórico a últimas 20 mensagens para evitar contexto excessivo
      const recentMessages = messages.slice(-20);

      const payload = {
        messages: [
          ...recentMessages.map((m) => ({ role: m.role, content: m.text })),
          { role: "user" as const, content: value },
        ],
        profile,
      };

      async function call(attempt = 1): Promise<string> {
        // timeout aumentado para contextos longos (60s)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000);
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
          clearTimeout(timeout);

          if (!res.ok) {
            if (
              attempt < 3 &&
              (res.status === 429 || res.status >= 500 || res.status === 408)
            ) {
              const delay = 500 * Math.pow(2, attempt - 1); // 500ms, 1000ms
              await new Promise((r) => setTimeout(r, delay));
              return call(attempt + 1);
            }
            const errPayload = await res.json().catch(() => ({} as any));
            const details = errPayload?.details
              ? `: ${errPayload.details}`
              : "";
            throw new Error(`HTTP ${res.status}${details}`);
          }
          const data = (await res.json()) as {
            role: "system";
            content: string;
          };
          return data.content;
        } catch (e: any) {
          clearTimeout(timeout);
          // Re-tenta falhas de rede/abort
          if (
            attempt < 3 &&
            (e?.name === "AbortError" || /network/i.test(String(e?.message)))
          ) {
            const delay = 500 * Math.pow(2, attempt - 1);
            await new Promise((r) => setTimeout(r, delay));
            return call(attempt + 1);
          }
          throw e;
        }
      }

      const content = await call();
      const sysId = Math.random().toString(36).slice(2);
      setMessages((prev) => [
        ...prev,
        { id: sysId, role: "system", text: content },
      ]);
    } catch (e: any) {
      const errId = Math.random().toString(36).slice(2);
      const isAbort = e?.name === "AbortError";
      const errorMsg = isAbort
        ? "Tempo de resposta excedido. Tente novamente."
        : e?.message
        ? `Desculpe, ocorreu um erro: ${e.message}`
        : "Desculpe, ocorreu um erro ao obter a resposta.";
      setMessages((prev) => [
        ...prev,
        {
          id: errId,
          role: "system",
          text: errorMsg,
        },
      ]);
      try {
        toast.error(errorMsg);
      } catch {}
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-rawn-bg-base text-rawn-text-primary">
      <HeaderRAWN />
      <main
        className="flex-1 overflow-y-auto overscroll-none mx-auto w-full max-w-3xl px-4 py-4"
        role="main"
        aria-label="Conversa com RAWN PRO"
        style={{
          WebkitOverflowScrolling: "touch",
          paddingBottom: "80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <section
            className="space-y-3 pb-4"
            role="log"
            aria-label="Histórico de mensagens"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m, idx) => {
              const isLast = idx === messages.length - 1 && m.role === "system";
              return (
                <MessageBubble
                  key={m.id}
                  role={m.role}
                  text={m.text}
                  isLast={isLast}
                  onRegenerate={
                    isLast
                      ? () => {
                          // reenvia a última mensagem do usuário
                          const lastUser = [...messages]
                            .reverse()
                            .find((mm) => mm.role === "user");
                          if (lastUser?.text) {
                            handleSend(lastUser.text);
                          }
                        }
                      : undefined
                  }
                />
              );
            })}
            <div ref={messagesEndRef} />
          </section>
        </motion.div>
      </main>
      {isTyping && <TypingIndicator />}
      <ChatComposer
        onSend={handleSend}
        onTypingStart={() => setIsTyping(true)}
      />
      <InstallPrompt />
    </div>
  );
}
