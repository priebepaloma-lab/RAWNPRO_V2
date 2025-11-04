"use client";

import React, { Suspense } from "react";
import LayoutChat from "@/components/LayoutChat";
import { useFirstRunGate } from "@/hooks/useFirstRunGate";
import { useSearchParams } from "next/navigation";

function ChatPageInner() {
  const sp = useSearchParams();
  const seed = React.useMemo(() => sp.get("msg") || undefined, [sp]);
  const auto = React.useMemo(() => sp.get("auto") === "1", [sp]);
  return (
    <LayoutChat
      initialMessages={[
        {
          id: "m1",
          role: "system",
          text: "Seja bem-vindo! Eu sou RAWN PRO, e vou estar com você na sua jornada de evolução de mente, corpo e hábito. Vamos começar?",
        },
      ]}
      seedMessage={seed}
      autoSendSeed={auto}
    />
  );
}

export default function Page() {
  useFirstRunGate();
  return (
    <Suspense>
      <ChatPageInner />
    </Suspense>
  );
}
