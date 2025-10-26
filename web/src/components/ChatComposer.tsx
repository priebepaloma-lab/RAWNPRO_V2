"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  onSend?: (text: string) => void;
  onTypingStart?: () => void;
};

export default function ChatComposer({ onSend, onTypingStart }: Props) {
  const [text, setText] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    // notifica o pai que começamos a digitar/processar
    onTypingStart?.();
    onSend?.(value);
    setText("");
  }

  return (
    <div className="sticky bottom-0 z-20 w-full border-t border-white/10 bg-[#0A0A0A]/70 backdrop-blur-lg">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-3"
        aria-label="Compositor de mensagem"
      >
        <input
          aria-label="Escreva sua mensagem"
          placeholder="Escreva sua mensagem..."
          className="flex-1 rounded-lg border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-[#00FF9C]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="rounded-lg bg-[#00FF9C] px-4 py-3 text-sm font-semibold text-black shadow transition-colors hover:bg-[#00e08c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-[#00FF9C]"
          aria-label="Enviar mensagem"
        >
          enviar
        </motion.button>
      </form>
    </div>
  );
}
