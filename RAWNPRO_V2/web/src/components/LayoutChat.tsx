"use client";

import React from "react";
import HeaderRAWN from "@/components/HeaderRAWN";
import MessageBubble from "@/components/MessageBubble";
import ChatComposer from "@/components/ChatComposer";

type Msg = { id: string; role: "user" | "system"; text: string };

type Props = {
  initialMessages?: Msg[];
};

export default function LayoutChat({ initialMessages = [] }: Props) {
  const [messages, setMessages] = React.useState<Msg[]>(initialMessages);
  const [isTyping, setIsTyping] = React.useState(false);

  async function handleSend(text: string) {
    const id = Math.random().toString(36).slice(2);
    setMessages((prev) => [...prev, { id, role: "user", text }]);

    try {
      const payload = {
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.text })),
          { role: "user" as const, content: text },
        ],
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { role: "system"; content: string };
      const sysId = Math.random().toString(36).slice(2);
      setMessages((prev) => [
        ...prev,
        { id: sysId, role: "system", text: data.content },
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
        <section
          className="flex-1 space-y-3"
          role="list"
          aria-label="Mensagens do chat"
        >
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} text={m.text} />
          ))}
        </section>
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
