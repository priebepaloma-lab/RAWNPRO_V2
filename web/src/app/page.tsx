"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <img
            src="/brand/header-48.png"
            alt="RAWN PRO"
            className="h-8 w-auto"
          />
          <Link
            href="/plans"
            className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/20"
          >
            Ver Planos
          </Link>
        </div>
      </header>

      {/* Hero – mobile first */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative px-4 pt-12 pb-16 sm:pt-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={fadeUp}
            className="text-xs font-semibold tracking-wider text-emerald-300"
          >
            RAWN PRO
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl"
          >
            Inteligência em movimento.
            <span className="block text-emerald-400">
              Performance e bem-estar guiados por IA.
            </span>
          </motion.h1>
          {/* Removed per request: Evolua com método / Planos inteligentes / Resultados consistentes */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/plans"
              className="w-full max-w-[360px] rounded-full bg-emerald-400 px-6 py-4 text-center font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:bg-emerald-300"
            >
              Ativar agora
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Base científica */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="px-4 pb-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h3
            variants={fadeUp}
            className="text-lg font-semibold text-white"
          >
            Base científica.
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-base leading-relaxed text-gray-300 text-pretty"
          >
            Diretrizes ACSM, OMS, NSCA e revisões Cochrane.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-1 text-base leading-relaxed text-gray-300/90 text-pretty"
          >
            Evidência traduzida em prática real.
          </motion.p>
        </div>
      </motion.section>

      {/* O que você ganha */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 pb-10"
      >
        <div className="mx-auto max-w-5xl">
          <motion.h3
            variants={fadeUp}
            className="text-center text-lg font-semibold text-white"
          >
            O que você ganha
          </motion.h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Treino inteligente — adapta-se ao seu corpo, tempo e meta.",
              "Nutrição consciente — decisões práticas de energia e recuperação.",
              "Sono & regeneração — melhora desempenho físico e mental.",
              "Foco & hábitos — constância e clareza de propósito.",
              "Movimento seguro — performance sem excessos nem lesões.",
            ].map((t) => (
              <motion.div
                key={t}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-base leading-relaxed text-gray-200 text-pretty"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Todas as dimensões */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 pb-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h3
            variants={fadeUp}
            className="text-lg font-semibold text-white"
          >
            Todas as dimensões.
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-base leading-relaxed text-gray-300 text-pretty"
          >
            Força, resistência, mobilidade, estética, equilíbrio e mente.
          </motion.p>
        </div>
      </motion.section>

      {/* IA com inteligência real */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 pb-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h3
            variants={fadeUp}
            className="text-lg font-semibold text-white"
          >
            IA com inteligência real.
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-base leading-relaxed text-gray-300 text-pretty"
          >
            Mais que anamnese. RAWN PRO compreende objetivos, interpreta padrões
            e se ajusta em tempo real — criando o plano ideal para cada fase da
            sua evolução.
          </motion.p>
        </div>
      </motion.section>

      {/* Resultados */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 pb-10"
      >
        <div className="mx-auto max-w-5xl">
          <motion.h3
            variants={fadeUp}
            className="text-center text-lg font-semibold text-white"
          >
            Resultados
          </motion.h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              "Mais constância.",
              "Mais energia.",
              "Mais controle.",
              "Transformação real.",
            ].map((t) => (
              <motion.div
                key={t}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-base text-gray-200"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Planos */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 pb-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h3
            variants={fadeUp}
            className="text-lg font-semibold text-white"
          >
            Planos
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-base leading-relaxed text-gray-300 text-pretty"
          >
            Mensal — R$ 29,90 1º mês, depois R$ 49,90/mês.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-gray-300 text-pretty"
          >
            Vitalício — R$ 449,90.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/plans"
              className="w-full max-w-[260px] rounded-full bg-emerald-400 px-6 py-3 text-center font-bold text-black hover:bg-emerald-300"
            >
              Começar agora
            </Link>
            <Link
              href="/about"
              className="w-full max-w-[260px] rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white hover:bg-white/10"
            >
              Ver como funciona
            </Link>
          </motion.div>
        </div>

        {/* Barra de CTA fixa no mobile */}
        <div className="fixed inset-x-0 bottom-0 z-30 block sm:hidden">
          <div className="mx-3 mb-3 rounded-full border border-emerald-400/30 bg-black/80 backdrop-blur supports-[padding:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-300">
                1º mês R$ 29,90 • Depois R$ 49,90/mês
              </span>
              <Link
                href="/plans"
                className="rounded-full bg-emerald-400 px-4 py-2 text-black text-sm font-bold"
              >
                Ativar
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Segurança e transparência */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 pb-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h3
            variants={fadeUp}
            className="text-lg font-semibold text-white"
          >
            Segurança e transparência.
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-400 text-pretty"
          >
            RAWN PRO é tecnologia de apoio à performance e bem-estar. Não
            substitui diagnóstico, prescrição ou orientação profissional.
          </motion.p>
        </div>
      </motion.section>

      {/* Footer enxuto */}
      <footer className="border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <img
              src="/brand/header-48.png"
              alt="RAWN PRO"
              className="mb-3 h-8 w-auto opacity-90"
            />
            <p className="text-sm text-gray-400">
              Educativo. Não substitui profissionais. 7 dias de garantia.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 sm:justify-end">
            <Link href="/terms" className="hover:text-gray-300">
              Termos
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacidade
            </Link>
            <Link href="/lgpd" className="hover:text-gray-300">
              LGPD
            </Link>
            <Link href="/disclaimer" className="hover:text-gray-300">
              Aviso Legal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
