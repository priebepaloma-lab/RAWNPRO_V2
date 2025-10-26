"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DocPage({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-rawn-bg-base text-rawn-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-rawn-border-panel bg-rawn-bg-base/95 backdrop-blur-panel">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-4">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rawn-border-neon/30 text-rawn-accent-neon transition-all hover:bg-rawn-accent-neon/10 hover:shadow-neon-focus"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-sm font-semibold uppercase tracking-wide">
            {title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border border-rawn-border-panel bg-rawn-bg-surface/50 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="prose prose-invert prose-sm max-w-none prose-headings:text-rawn-text-primary prose-p:text-rawn-text-secondary prose-a:text-rawn-accent-neon prose-a:no-underline hover:prose-a:text-rawn-accent-lime prose-strong:text-rawn-text-primary prose-ul:text-rawn-text-secondary prose-ol:text-rawn-text-secondary">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
