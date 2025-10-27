"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Editar Perfil", href: "/profile" },
  { label: "Sobre o RAWN PRO", href: "/about" },
  { label: "Termos de Uso", href: "/terms" },
  { label: "Política de Privacidade", href: "/privacy" },
  { label: "Política LGPD", href: "/lgpd" },
  { label: "Aviso de Responsabilidade", href: "/disclaimer" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuFloating({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-4 top-16 z-50 w-64 overflow-hidden rounded-md border border-rawn-border-neon/20 bg-rawn-bg-base/95 shadow-neon-soft backdrop-blur-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rawn-border-panel px-4 py-3">
              <span className="text-sm font-semibold uppercase tracking-wide text-rawn-text-primary">
                Menu
              </span>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-rawn-text-muted transition-colors hover:bg-rawn-accent-neon/10 hover:text-rawn-accent-neon"
                aria-label="Fechar menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items with stagger */}
            <motion.nav
              className="py-2"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                },
              }}
            >
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -6 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="group flex items-center gap-3 px-4 py-3 text-sm text-rawn-text-primary transition-all hover:translate-x-1 hover:bg-rawn-accent-neon/10 hover:text-rawn-accent-neon"
                  >
                    <span className="h-1 w-1 rounded-full bg-rawn-accent-neon opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
