"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  role: "user" | "system";
  text: string;
};

export default function MessageBubble({ role, text }: Props) {
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
        {text}
      </div>
    </motion.div>
  );
}
