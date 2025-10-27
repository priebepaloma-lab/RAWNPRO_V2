"use client";

import React from "react";
import LayoutChat from "@/components/LayoutChat";
import { useFirstRunGate } from "@/hooks/useFirstRunGate";

export default function Page() {
  useFirstRunGate();

  return (
    <LayoutChat
      initialMessages={[
        {
          id: "m1",
          role: "system",
          text: "Seja bem-vindo! Eu sou RAWN PRO, e vou estar com você na sua jornada de evolução de mente, corpo e hábito. Vamos começar?",
        },
      ]}
    />
  );
}
