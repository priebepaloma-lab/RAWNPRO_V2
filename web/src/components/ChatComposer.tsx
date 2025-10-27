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
        position: "fixed",
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
          whileHover={{ scale: 1.15, rotate: -8 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!text.trim()}
          className="flex flex-shrink-0 items-center justify-center transition-all duration-300 focus:outline-none"
          aria-label="Enviar mensagem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={[
              "h-8 w-8 transition-all duration-300",
              text.trim()
                ? "text-rawn-accent-neon drop-shadow-[0_0_8px_rgba(0,255,156,0.6)]"
                : "text-rawn-text-muted/40",
            ].join(" ")}
            style={{ transform: "rotate(-45deg)" }}
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </motion.button>
      </form>
    </div>
  );
}
