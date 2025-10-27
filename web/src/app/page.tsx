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
          text: "E aí! Pronto para evoluir hoje? Pode falar — treino, dieta, sono, o que precisar. Vamos direto ao ponto.",
        },
      ]}
    />
  );
}
