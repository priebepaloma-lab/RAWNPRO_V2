"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Hook para gerenciar o fluxo de primeiro acesso
 * Redireciona usuários novos para: /welcome → /consent → /profile → /
 */
export function useFirstRunGate() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Páginas públicas que não requerem gate
    const publicPaths = [
      "/welcome",
      "/consent",
      "/profile",
      "/about",
      "/terms",
      "/privacy",
      "/lgpd",
      "/disclaimer",
    ];

    if (publicPaths.includes(pathname)) {
      return;
    }

    // Verifica localStorage
    const consentAccepted = localStorage.getItem("consentAccepted");
    const firstRunComplete = localStorage.getItem("firstRunComplete");

    // Se nunca aceitou termos, vai para welcome
    if (!consentAccepted) {
      router.push("/welcome");
      return;
    }

    // Se aceitou termos mas não completou perfil, vai para profile
    if (consentAccepted && !firstRunComplete) {
      router.push("/profile");
      return;
    }

    // Se completou tudo, deixa acessar normalmente
  }, [pathname, router]);
}
