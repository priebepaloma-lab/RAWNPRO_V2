"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number; // ms
};

type ToastContextValue = {
  show: (
    message: string,
    opts?: { type?: ToastType; duration?: number }
  ) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider/>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const api = useMemo<ToastContextValue>(
    () => ({
      show(message, opts) {
        const id = Math.random().toString(36).slice(2);
        const toast: Toast = {
          id,
          message,
          type: opts?.type ?? "info",
          duration: opts?.duration ?? 3500,
        };
        setToasts((prev) => [...prev, toast]);
        // auto-dismiss
        setTimeout(() => dismiss(id), toast.duration);
      },
      success(message, duration) {
        api.show(message, { type: "success", duration });
      },
      error(message, duration) {
        api.show(message, { type: "error", duration });
      },
      info(message, duration) {
        api.show(message, { type: "info", duration });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toaster container */}
      <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end gap-2 p-4 sm:p-6">
        <div className="mt-auto w-full max-w-xs sm:max-w-sm">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={[
                  "pointer-events-auto mb-2 rounded-lg border px-3 py-2.5 text-sm shadow-lg backdrop-blur-sm",
                  "bg-rawn-bg-base/95 border-rawn-border-panel text-rawn-text-primary",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      "mt-1 inline-block h-2.5 w-2.5 rounded-full",
                      t.type === "success"
                        ? "bg-rawn-accent-neon shadow-neon-focus"
                        : t.type === "error"
                        ? "bg-red-400"
                        : "bg-white/70",
                    ].join(" ")}
                    aria-hidden
                  />
                  <div className="flex-1 text-rawn-text-primary/95">
                    {t.message}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="ml-2 rounded-md border border-rawn-border-panel/70 px-2 py-1 text-xs text-rawn-text-secondary hover:bg-white/5"
                  >
                    fechar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
