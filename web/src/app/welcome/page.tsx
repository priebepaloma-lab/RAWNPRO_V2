"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import WelcomeInstall from "@/components/WelcomeInstall";

// Evita cache na CDN/SSG para refletir mudanças imediatamente
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function WelcomePage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/consent");
  };

  return (
    <div className="min-h-screen bg-rawn-bg-base flex flex-col items-center justify-center px-4 relative">
      {/* Install overlay shown only when not installed/dismissed */}
      <WelcomeInstall />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <Image
            src="/brand/Tela Walcome rawn pro.png"
            alt="RAWN PRO"
            width={280}
            height={280}
            priority
            className="drop-shadow-neon-soft w-[220px] h-auto md:w-[280px]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-rawn-text-secondary mb-10 md:mb-12 leading-relaxed"
        >
          Ciência em conversa.
          <br />
          Clareza em ação.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full max-w-xs rounded-pill bg-rawn-accent-neon px-8 py-4 md:py-4.5 text-base font-semibold text-black shadow-neon-glow transition-all hover:shadow-neon-focus hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-rawn-accent-neon focus:ring-offset-2 focus:ring-offset-rawn-bg-base"
        >
          Continuar
        </motion.button>

        {/* Nota legal removida: os termos serão apresentados na próxima etapa */}
      </motion.div>
    </div>
  );
}
