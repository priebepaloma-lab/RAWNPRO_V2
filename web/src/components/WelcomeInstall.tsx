"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

export default function WelcomeInstall() {
  const [showWelcome, setShowWelcome] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [showHelp, setShowHelp] = React.useState(false);

  React.useEffect(() => {
    // Verifica se já está instalado
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isInstalled = localStorage.getItem("pwa-installed");

    console.log("WelcomeInstall - Debug:", {
      isStandalone,
      isInstalled,
    });

    if (isStandalone || isInstalled) {
      console.log("WelcomeInstall - Não mostrando (já instalado ou dismissed)");
      setShowWelcome(false);
      return;
    }

    console.log("WelcomeInstall - Mostrando tela de boas-vindas");

    // Captura evento de instalação (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Mostra a tela de boas-vindas
    setShowWelcome(true);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome - instalação nativa
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem("pwa-installed", "true");
        setShowWelcome(false);
      }
      setDeferredPrompt(null);
    } else {
      // iOS (ou navegadores sem beforeinstallprompt) – mostra instruções
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        setShowHelp(true);
      }
    }
  };

  console.log("WelcomeInstall - Render, showWelcome:", showWelcome);

  if (!showWelcome) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rawn-bg-base px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center space-y-6">
          {/* Logo (sempre colorido) */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative h-24 w-24">
              <Image
                src="/brand/Tela Walcome rawn pro.png"
                alt="RAWN PRO"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-white">
              Bem-vindo ao{" "}
              <span className="text-rawn-accent-neon">RAWN PRO</span>
            </h1>
            <p className="text-rawn-text-muted text-sm leading-relaxed">
              Para a melhor experiência, instale o app em seu dispositivo
            </p>
          </motion.div>

          {/* Benefícios removidos para experiência direta */}

          {/* Botão principal de instalação e instruções (quando necessário) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <button
              onClick={handleInstall}
              className="w-full rounded-full bg-rawn-accent-neon px-6 py-4 text-base font-bold text-black shadow-neon-glow hover:shadow-neon-intense transition-all flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Instalar agora
            </button>

            {/* Instruções aparecem quando necessário (iOS ou sem evento) */}
            {isIOS && showHelp && (
              <div className="bg-rawn-bg-surface/50 border border-rawn-accent-neon/30 rounded-xl p-4 text-left space-y-3">
                <p className="text-white font-semibold text-sm">
                  Como instalar no iOS:
                </p>
                <div className="space-y-2 text-xs text-white/80">
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rawn-accent-neon min-w-[20px]">
                      1.
                    </span>
                    <span>
                      Toque nos <strong>três pontinhos (⋯)</strong> na barra
                      inferior
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rawn-accent-neon min-w-[20px]">
                      2.
                    </span>
                    <span>
                      Role e toque em{" "}
                      <strong>"Adicionar à Tela de Início"</strong>
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rawn-accent-neon min-w-[20px]">
                      3.
                    </span>
                    <span>Confirme e abra pelo ícone na tela inicial</span>
                  </p>
                </div>
              </div>
            )}

            {/* Removido: ação de pular para simplificar a decisão de instalar */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  {
    /* Build marker para confirmar versão no dispositivo */
  }
  <p className="text-center text-[10px] text-white/40">build 97dc90f</p>;
}
