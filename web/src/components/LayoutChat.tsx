"use client";

import React from "react";
import { useProfile } from "@/app/profile/ProfileContext";
import HeaderRAWN from "@/components/HeaderRAWN";
import MessageBubble from "@/components/MessageBubble";
import ChatComposer from "@/components/ChatComposer";
import { motion } from "framer-motion";

type Msg = { id: string; role: "user" | "system"; text: string };

type Props = {
  initialMessages?: Msg[];
};

export default function LayoutChat({ initialMessages = [] }: Props) {
  const [messages, setMessages] = React.useState<Msg[]>(initialMessages);
  const [isTyping, setIsTyping] = React.useState(false);
  const { profile } = useProfile();

  // chave de armazenamento local
  const STORAGE_KEY = "rawn.chat.history";

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
      const payload = {
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.text })),
          { role: "user" as const, content: value },
        ],
        profile,
      };

      async function call(attempt = 1): Promise<string> {
        // timeout curto para evitar travas esporádicas
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
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
    } catch (e) {
      const errId = Math.random().toString(36).slice(2);
      setMessages((prev) => [
        ...prev,
        {
          id: errId,
          role: "system",
          text: "Desculpe, ocorreu um erro ao obter a resposta.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#0A0A0A] to-[#101010] text-zinc-100">
      <HeaderRAWN />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3 px-4 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <section
            className="flex-1 space-y-3"
            role="list"
            aria-label="Mensagens do chat"
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
          </section>
        </motion.div>
      </main>
      {isTyping && (
        <div className="mx-auto w-full max-w-3xl px-4 py-2 text-sm italic text-neutral-400 animate-pulse">
          digitando...
        </div>
      )}
      <ChatComposer
        onSend={handleSend}
        onTypingStart={() => setIsTyping(true)}
      />
    </div>
  );
}
