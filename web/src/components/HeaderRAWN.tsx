"use client";

import React from "react";

export default function HeaderRAWN() {
  return (
    <header
      className="sticky top-0 z-20 h-14 w-full border-b border-white/5 bg-[#0A0A0A]/95 text-[#00FF9C] backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/75"
      role="banner"
      aria-label="Cabeçalho RAWN PRO"
    >
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold tracking-wide">RAWN PRO</span>
          <span className="text-[11px] uppercase tracking-wider text-zinc-400">
            ONLINE
          </span>
        </div>
        <button
          className="rounded-md px-2 py-1 text-[#00FF9C] transition hover:bg-white/5"
          aria-label="Opções"
        >
          ...
        </button>
      </div>
    </header>
  );
}
