"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone } from "lucide-react";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    // Verifica se já está instalado
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isInstalled = localStorage.getItem("pwa-installed");
    const isDismissed = localStorage.getItem("install-prompt-dismissed");

    if (isStandalone || isInstalled || isDismissed) {
      return;
    }

    // Captura evento de instalação (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // iOS Safari não tem beforeinstallprompt, então mostra após 3s
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    if (isIOS && isSafari) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem("pwa-installed", "true");
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("install-prompt-dismissed", "true");
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div className="relative rounded-2xl border border-rawn-accent-neon/30 bg-rawn-bg-base/95 backdrop-blur-xl p-4 shadow-2xl shadow-rawn-accent-neon/20">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-full bg-rawn-accent-neon/10 p-2.5">
                <Smartphone className="text-rawn-accent-neon" size={24} />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-base font-semibold text-white mb-1">
                  Instalar RAWN PRO
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  {isIOS
                    ? "Adicione à tela inicial para melhor experiência — tela cheia, sem navegador!"
                    : "Instale o app para acesso rápido e experiência completa."}
                </p>

                {isIOS ? (
                  <div className="space-y-2 text-xs text-white/70">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-rawn-accent-neon">
                        1.
                      </span>
                      Toque no botão <strong>Compartilhar</strong> (quadrado com
                      seta ↑)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-rawn-accent-neon">
                        2.
                      </span>
                      Role e toque em{" "}
                      <strong>"Adicionar à Tela de Início"</strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-rawn-accent-neon">
                        3.
                      </span>
                      Confirme e abra pelo ícone na tela inicial
                    </p>
                  </div>
                ) : (
                  <motion.button
                    onClick={handleInstall}
                    whileTap={{ scale: 0.96 }}
                    className="w-full rounded-full bg-rawn-accent-neon px-4 py-2.5 text-sm font-semibold text-black shadow-neon-soft hover:shadow-neon-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Instalar agora
                  </motion.button>
                )}
              </div>
            </div>

            {!isIOS && (
              <button
                onClick={handleDismiss}
                className="mt-3 w-full text-center text-xs text-white/60 hover:text-white/80 transition-colors"
              >
                Agora não
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
