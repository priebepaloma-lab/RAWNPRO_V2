"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-2 text-sm text-rawn-text-muted flex items-center gap-2">
      <span className="sr-only">escrevendo…</span>
      <div className="flex items-center gap-1.5" aria-hidden>
        <motion.span
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-rawn-accent-neon/80 shadow-neon-soft"
        />
        <motion.span
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
          className="h-2 w-2 rounded-full bg-rawn-accent-neon/80 shadow-neon-soft"
        />
        <motion.span
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
          className="h-2 w-2 rounded-full bg-rawn-accent-neon/80 shadow-neon-soft"
        />
      </div>
      <span className="italic text-white/90">escrevendo…</span>
    </div>
  );
}
