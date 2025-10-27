"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Zap } from "lucide-react";
import Image from "next/image";

export default function WelcomeInstall() {
  const [showWelcome, setShowWelcome] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    // Verifica se já está instalado
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isInstalled = localStorage.getItem("pwa-installed");
    const welcomeDismissed = localStorage.getItem("welcome-dismissed");

    console.log("WelcomeInstall - Debug:", {
      isStandalone,
      isInstalled,
      welcomeDismissed,
    });

    if (isStandalone || isInstalled || welcomeDismissed) {
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
      // iOS - mostra instruções
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        // Não fecha a tela, deixa as instruções visíveis
      }
    }
  };

  const handleSkip = () => {
    localStorage.setItem("welcome-dismissed", "true");
    setShowWelcome(false);
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
          {/* Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative h-24 w-24">
              <Image
                src="/icons/rawnpro-192.png"
                alt="RAWN PRO"
                width={96}
                height={96}
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

          {/* Benefícios */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 text-left"
          >
            <div className="flex items-start gap-3 p-3 rounded-lg bg-rawn-bg-surface/50 border border-rawn-border-neon/20">
              <Smartphone
                className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <p className="text-white text-sm font-medium">Acesso rápido</p>
                <p className="text-rawn-text-muted text-xs">
                  Abra direto da tela inicial
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-rawn-bg-surface/50 border border-rawn-border-neon/20">
              <Zap
                className="text-rawn-accent-neon flex-shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <p className="text-white text-sm font-medium">Tela cheia</p>
                <p className="text-rawn-text-muted text-xs">
                  Experiência sem navegador
                </p>
              </div>
            </div>
          </motion.div>

          {/* Instruções iOS ou Botão Android */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {isIOS ? (
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
            ) : (
              <button
                onClick={handleInstall}
                className="w-full rounded-full bg-rawn-accent-neon px-6 py-4 text-base font-bold text-black shadow-neon-glow hover:shadow-neon-intense transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Instalar agora
              </button>
            )}

            {/* Botão pular */}
            <button
              onClick={handleSkip}
              className="w-full text-sm text-rawn-text-muted hover:text-white transition-colors"
            >
              Continuar no navegador
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
