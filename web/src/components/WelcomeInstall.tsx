"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

export default function WelcomeInstall() {
  const [showWelcome, setShowWelcome] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [showHelp, setShowHelp] = React.useState(true);

  React.useEffect(() => {
    // Verifica se já está instalado
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    console.log("WelcomeInstall - Debug:", { isStandalone });

    if (isStandalone) {
      console.log("WelcomeInstall - Não mostrando (standalone)");
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
    }
  };

  console.log("WelcomeInstall - Render, showWelcome:", showWelcome);

  if (!showWelcome) return null;

  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center space-y-8">
          {/* Logo Grande */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative h-32 w-32">
              <Image
                src="/brand/Favicon rawn pro.png"
                alt="RAWN PRO"
                width={128}
                height={128}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Título obrigatório - instalação necessária */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-lg font-bold text-white uppercase leading-tight px-4">
              INSTRUÇÕES PARA INSTALAÇÃO DO APP :
            </h1>
          </motion.div>

          {/* Instruções simples numeradas - apenas para iOS */}
          {isIOS && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 text-left px-2"
            >
              <p className="flex items-start gap-3 text-white text-sm">
                <span className="font-bold text-base">1.</span>
                <span>
                  Toque nos <strong>(...)</strong> no canto inferior esquerdo do
                  seu navegador
                </span>
              </p>
              <p className="flex items-start gap-3 text-white text-sm">
                <span className="font-bold text-base">2.</span>
                <span>
                  Role para baixo e toque em "Adicionar à Tela de Início"
                </span>
              </p>
              <p className="flex items-start gap-3 text-white text-sm">
                <span className="font-bold text-base">3.</span>
                <span>
                  Confirme e pronto! Abra o app pelo ícone na sua tela inicial
                </span>
              </p>
            </motion.div>
          )}

          {/* Para Android - mostrar botão de instalação */}
          {!isIOS && deferredPrompt && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleInstall}
                className="w-full rounded-full bg-rawn-accent-neon px-6 py-4 text-base font-bold text-black shadow-neon-glow hover:shadow-neon-intense transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Instalar agora
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
