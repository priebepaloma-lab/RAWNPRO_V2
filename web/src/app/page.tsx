import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <img
            src="/brand/header-48.png"
            alt="RAWN PRO"
            className="h-9 w-auto"
          />
          <Link
            href="/plans"
            className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/20"
          >
            Ver Planos
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-5xl font-extrabold leading-tight sm:text-6xl">
            Plataforma de performance 24/7
            <span className="block text-emerald-400">
              guiada por IA e ciência aplicada
            </span>
          </h1>
          <p className="mx-auto mb-4 max-w-3xl text-lg text-gray-300">
            RAWN PRO é uma plataforma de bem-estar e performance que integra
            movimento, nutrição, sono e hábitos. Conteúdo educativo baseado em
            evidências — autonomia com segurança e propósito.
          </p>
          <p className="mx-auto mb-8 max-w-3xl text-xs text-gray-400">
            Não substitui avaliação, diagnóstico ou prescrição de profissionais
            habilitados.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/plans"
              className="rounded-xl bg-emerald-400 px-8 py-4 font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.45)] transition hover:bg-emerald-300"
            >
              Começar por R$ 29,90 no 1º mês
            </Link>
            <span className="text-sm text-gray-400">
              Depois: <strong>R$ 49,90/mês</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Benefits (linguagem blindada) */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Treino individualizado",
              desc: "Planos inteligentes de movimento. Seu corpo guiado por IA para evoluir com segurança e propósito.",
            },
            {
              title: "Nutrição e timing",
              desc: "Equilíbrio alimentar inteligente. Estratégias de timing e energia baseadas em evidências, sem substituir orientação profissional.",
            },
            {
              title: "Sono e recuperação",
              desc: "Recuperação otimizada. Métodos de autocuidado e rotina que potencializam o descanso e a performance mental.",
            },
            {
              title: "Foco e hábitos",
              desc: "Foco elevado. Protocolos comportamentais guiados por ciência cognitiva e prática de alta performance.",
            },
            {
              title: "Prevenção de lesões",
              desc: "Movimento consciente. Inteligência preventiva para reduzir riscos e fortalecer a consistência física.",
            },
            {
              title: "Base científica comprovada",
              desc: "Fundamentado em ciência. Desenvolvido com base em evidências reconhecidas por entidades internacionais de saúde e esporte.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="px-4 py-16">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold">Escolha seu plano</h2>
          <p className="mt-2 text-gray-400">Garantia de 7 dias.</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {/* Mensal */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <h3 className="mb-2 text-xl font-bold">Mensal</h3>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight">
                R$ 29,90
              </span>
              <span className="text-sm text-gray-400">no 1º mês</span>
            </div>
            <p className="mb-4 text-sm text-gray-400">
              A partir do 2º mês:{" "}
              <span className="text-white font-semibold">R$ 49,90/mês</span>
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-300 flex-1">
              <li>Mensagens ilimitadas</li>
              <li>Acesso completo ao RAWN PRO</li>
              <li>Atualizações contínuas</li>
              <li>Suporte prioritário</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/plans"
                className="block w-full rounded-xl bg-emerald-400 py-3 text-center font-bold text-black transition hover:bg-emerald-300"
              >
                Ativar Protocolo
              </Link>
            </div>
          </div>

          {/* Vitalício */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-6 flex flex-col">
            <div className="mb-2 inline-block rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-black">
              MELHOR VALOR
            </div>
            <h3 className="mb-2 text-xl font-bold">Vitalício</h3>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">R$ 449,90</span>
            </div>
            <p className="mb-4 text-sm text-emerald-300">
              Pagamento único • Sem mensalidades
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-200 flex-1">
              <li>Tudo do plano mensal</li>
              <li>Sem mensalidades</li>
              <li>Suporte VIP</li>
              <li>Atualizações futuras</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/plans"
                className="block w-full rounded-xl bg-emerald-400 py-3 text-center font-bold text-black transition hover:bg-emerald-300"
              >
                Ativar Acesso Vitalício
              </Link>
            </div>
          </div>
        </div>

        {/* Legal fine print for compliance */}
        <div className="mx-auto mt-6 max-w-4xl text-xs leading-relaxed text-gray-400">
          <p className="mb-2">
            Oferta promocional: R$ 29,90 no 1º mês com desconto aplicado
            automaticamente no checkout Stripe. Cobrança recorrente mensal a
            partir do 2º mês no valor de R$ 49,90/mês. Você pode cancelar a
            qualquer momento antes da próxima renovação. Garantia incondicional
            de 7 dias conforme legislação aplicável. O plano Vitalício refere-se
            ao acesso enquanto o produto/serviço estiver disponível e mantido
            pela RAWN PRO, para uso pessoal e não transferível.
          </p>
          <p className="mb-2">
            O conteúdo do RAWN PRO tem caráter educativo e informativo. Não
            substitui avaliação, diagnóstico ou prescrição de profissional de
            saúde, treinamento físico, nutricional, psicológico, médico,
            jurídico ou financeiro. Resultados variam de acordo com contexto
            individual e não são garantidos. Ao prosseguir, você concorda com
            nossos
            <Link href="/terms" className="text-emerald-300 hover:underline">
              {" "}
              Termos de Uso
            </Link>
            ,
            <Link href="/privacy" className="text-emerald-300 hover:underline">
              {" "}
              Política de Privacidade
            </Link>
            ,
            <Link href="/lgpd" className="text-emerald-300 hover:underline">
              {" "}
              Aviso de LGPD
            </Link>{" "}
            e
            <Link
              href="/disclaimer"
              className="text-emerald-300 hover:underline"
            >
              {" "}
              Aviso Legal
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <img
                src="/brand/header-48.png"
                alt="RAWN PRO"
                className="mb-3 h-8 w-auto opacity-90"
              />
              <p className="text-sm text-gray-400">
                Inteligência aplicada à performance humana. Ciência que fala com
                você.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-sm text-gray-500 sm:items-end">
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-gray-300">
                  Termos de Uso
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
              <div>© 2025 RAWN PRO</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
