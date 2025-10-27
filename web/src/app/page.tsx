"use client";

import React from "react";
import LayoutChat from "@/components/LayoutChat";
import { useFirstRunGate } from "@/hooks/useFirstRunGate";

export default function Page() {
  useFirstRunGate();

  return (
    <>
      {/* MARCADOR DE VERSÃO VISÍVEL NO CHAT */}
      <div className="fixed top-4 left-4 z-50 bg-rawn-accent-neon text-black px-3 py-1.5 rounded-lg font-mono text-xs font-bold shadow-lg">
        v6-FINAL
      </div>
      <LayoutChat
        initialMessages={[
          {
            id: "m1",
            role: "system",
            text: "Seja bem-vindo! Eu sou RAWN PRO, e vou estar com você na sua jornada de evolução de mente, corpo e hábito. Vamos começar?",
          },
        ]}
      />
    </>
  );
}
