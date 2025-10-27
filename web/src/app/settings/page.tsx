"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function SettingsPage() {
  const router = useRouter();
  const toast = useToast();
  const [showModal, setShowModal] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

  // Focus trap no modal
  React.useEffect(() => {
    if (!showModal) return;

    // Foca no botão cancelar quando modal abre
    cancelButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) {
        setShowModal(false);
      }

      // Trap focus dentro do modal
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal, isDeleting]);

  const handleDeleteData = () => {
    setIsDeleting(true);

    try {
      // Lista todas as chaves que precisam ser removidas
      const keysToRemove = [
        "rawn.user.profile",
        "rawn.chat.history",
        "consentAccepted",
        "firstRunComplete",
        "profileSaved",
      ];

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      toast.success("Todos os dados foram apagados com sucesso");

      // Aguarda 1s para mostrar o toast e redireciona
      setTimeout(() => {
        router.push("/welcome");
      }, 1000);
    } catch (error) {
      toast.error("Erro ao apagar dados. Tente novamente.");
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-rawn-bg-base flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[720px]"
        >
          {/* Header */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Voltar ao chat
            </button>
            <h1 className="text-3xl font-semibold text-white mb-3">
              Configurações
            </h1>
            <p className="text-sm text-white/90 leading-relaxed">
              Gerencie suas preferências e dados armazenados localmente no
              dispositivo.
            </p>
          </div>

          {/* Settings Container */}
          <div className="rounded-lg border border-rawn-border-panel bg-[#4A4A4A] backdrop-blur-sm p-8 mb-6 space-y-8">
            {/* Seção: Privacidade e Dados */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Privacidade e Dados
              </h2>

              <div className="space-y-4">
                {/* Info sobre dados armazenados */}
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white/90 leading-relaxed mb-3">
                    Os seguintes dados estão armazenados apenas no seu
                    dispositivo:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                    <li>Perfil (nome, idade, nível, objetivo, limitação)</li>
                    <li>Histórico de conversas com o RAWN PRO</li>
                    <li>Preferências de consentimento e onboarding</li>
                  </ul>
                  <p className="text-xs text-white/70 mt-3">
                    Nenhum dado é enviado para servidores externos. Tudo fica
                    exclusivamente no seu navegador.
                  </p>
                </div>

                {/* Botão Apagar Dados */}
                <motion.button
                  type="button"
                  onClick={() => setShowModal(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-md border-2 border-red-500/50 bg-red-500/10 px-6 py-4 text-left hover:bg-red-500/20 hover:border-red-500 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                      <Trash2 size={20} className="text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-1">
                        Apagar Todos os Dados
                      </h3>
                      <p className="text-sm text-white/70">
                        Remove permanentemente seu perfil, histórico de
                        conversas e preferências.
                      </p>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Seção: Sobre */}
            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Sobre o RAWN PRO
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Versão</span>
                  <span className="text-sm text-white font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Licença</span>
                  <span className="text-sm text-white font-medium">
                    Proprietária
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <a
                    href="/about"
                    className="text-sm text-rawn-accent-neon hover:underline"
                  >
                    Sobre o RAWN PRO
                  </a>
                  <a
                    href="/terms"
                    className="text-sm text-rawn-accent-neon hover:underline"
                  >
                    Termos de Uso
                  </a>
                  <a
                    href="/privacy"
                    className="text-sm text-rawn-accent-neon hover:underline"
                  >
                    Política de Privacidade
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Confirmação */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => !isDeleting && setShowModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#4A4A4A] rounded-lg border border-red-500/30 p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <div className="flex-1">
                  <h3
                    id="modal-title"
                    className="text-lg font-semibold text-white mb-2"
                  >
                    Confirmar exclusão de dados
                  </h3>
                  <p
                    id="modal-description"
                    className="text-sm text-white/80 leading-relaxed"
                  >
                    Esta ação é <strong>irreversível</strong>. Todos os seus
                    dados serão permanentemente apagados deste dispositivo:
                  </p>
                  <ul className="text-sm text-white/70 mt-3 space-y-1 list-disc list-inside">
                    <li>Perfil completo</li>
                    <li>Histórico de conversas</li>
                    <li>Preferências e configurações</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isDeleting}
                  className="flex-1 rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Cancelar exclusão"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteData}
                  disabled={isDeleting}
                  className="flex-1 rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={
                    isDeleting
                      ? "Apagando dados"
                      : "Confirmar exclusão de todos os dados"
                  }
                >
                  {isDeleting ? "Apagando..." : "Apagar Tudo"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
