import React from "react";
import LayoutChat from "@/components/LayoutChat";

export default function Page() {
  return (
    <LayoutChat
      initialMessages={[
        {
          id: "m1",
          role: "system",
          text: "Olá! Eu sou o RAWN PRO — como posso te ajudar hoje?",
        },
        {
          id: "m2",
          role: "user",
          text: "Quero configurar meu projeto e entender os próximos passos.",
        },
      ]}
    />
  );
}
