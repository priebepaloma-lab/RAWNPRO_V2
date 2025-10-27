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
    <div 
      className="w-full border-t border-rawn-border-panel bg-rawn-bg-base backdrop-blur-panel safe-area-bottom"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-2.5"
        aria-label="Compositor de mensagem"
      >
        <input
          aria-label="Escreva sua mensagem"
          placeholder="Escreva sua mensagem..."
          className="flex-1 rounded-full border border-rawn-border-neon bg-rawn-bg-base/80 px-4 py-2.5 text-rawn-text-primary outline-none placeholder:text-rawn-text-muted focus:border-rawn-accent-neon focus:shadow-neon-focus transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
          enterKeyHint="send"
          autoCapitalize="sentences"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          style={{ fontSize: "16px" }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-rawn-accent-neon bg-rawn-accent-neon/10 text-rawn-accent-neon shadow-neon-soft transition-all hover:bg-rawn-accent-neon hover:text-rawn-bg-base hover:shadow-neon-glow active:scale-95 focus:outline-none focus:ring-2 focus:ring-rawn-accent-neon"
          aria-label="Enviar mensagem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            style={{ transform: "translateX(1px)" }}
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </motion.button>
      </form>
    </div>
  );
}
