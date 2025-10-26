"use client";

import React from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import MenuFloating from "./MenuFloating";

export default function HeaderRAWN() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header
      className="sticky top-0 z-20 h-14 w-full border-b border-rawn-border-panel bg-rawn-bg-base/95 backdrop-blur-panel"
      role="banner"
      aria-label="Cabeçalho RAWN PRO"
    >
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/brand/Header do Chat 32px.png"
              alt="Logo RAWN PRO"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-rawn-text-primary uppercase">
              RAWN PRO
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-rawn-accent-neon font-medium">
              ONLINE
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-rawn-border-neon/30 text-rawn-accent-neon transition-all hover:bg-rawn-accent-neon/10 hover:shadow-neon-focus"
          aria-label="Menu de opções"
          aria-expanded={isMenuOpen}
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <MenuFloating isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
