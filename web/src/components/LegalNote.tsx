"use client";

import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  variant?: "compact" | "full";
};

export default function LegalNote({
  className = "",
  variant = "compact",
}: Props) {
  return (
    <div
      className={[
        "text-[11px] leading-relaxed text-rawn-text-muted",
        className,
      ].join(" ")}
    >
      <p>
        Conteúdo educativo e informativo. Não substitui avaliação, diagnóstico
        ou orientação de profissionais habilitados. Cancelamento a qualquer
        momento antes da próxima renovação. Garantia de 7 dias.
      </p>
      {variant === "full" ? (
        <p className="mt-1">
          O plano vitalício concede acesso enquanto o serviço estiver disponível
          e mantido. Pagamentos processados via Stripe — não armazenamos dados
          de cartão. Consulte nossos
          <Link href="/terms" className="text-rawn-accent-neon hover:underline">
            {" "}
            Termos
          </Link>
          ,
          <Link
            href="/privacy"
            className="text-rawn-accent-neon hover:underline"
          >
            {" "}
            Privacidade
          </Link>
          ,
          <Link href="/lgpd" className="text-rawn-accent-neon hover:underline">
            {" "}
            LGPD
          </Link>{" "}
          e
          <Link
            href="/disclaimer"
            className="text-rawn-accent-neon hover:underline"
          >
            {" "}
            Aviso Legal
          </Link>
          .
        </p>
      ) : (
        <p className="mt-1">
          Consulte
          <Link href="/terms" className="text-rawn-accent-neon hover:underline">
            {" "}
            Termos
          </Link>
          ,
          <Link
            href="/privacy"
            className="text-rawn-accent-neon hover:underline"
          >
            {" "}
            Privacidade
          </Link>
          ,
          <Link href="/lgpd" className="text-rawn-accent-neon hover:underline">
            {" "}
            LGPD
          </Link>{" "}
          e
          <Link
            href="/disclaimer"
            className="text-rawn-accent-neon hover:underline"
          >
            {" "}
            Aviso Legal
          </Link>
          .
        </p>
      )}
    </div>
  );
}
