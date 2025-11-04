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
            Treinador de Elite 24/7
            <span className="block text-emerald-400">baseado em ciência</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-300">
            RAWN PRO une treino, nutrição, sono e performance com diretrizes
            validadas por ACSM/WHO/IOC. Pergunte, ajuste e evolua todos os dias.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/plans"
              className="rounded-xl bg-emerald-400 px-8 py-4 font-bold text-black shadow-[0_0_24px_rgba(16,185,129,0.45)] transition hover:bg-emerald-300"
            >
              Começar por R$ 49,90/mês
            </Link>
            <span className="text-sm text-gray-400">
              Primeiro mês promocional: <strong>R$ 29,90</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Treino individualizado",
            "Nutrição e timing",
            "Sono e recuperação",
            "Foco e hábitos",
            "Prevenção de lesões",
            "Base científica comprovada",
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="mb-2 text-lg font-semibold">{t}</h3>
              <p className="text-sm text-gray-400">
                Orientação prática e segura para avançar com consistência.
              </p>
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
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 text-xl font-bold">Mensal</h3>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">R$ 49,90</span>
              <span className="text-sm text-gray-400">/mês</span>
            </div>
            <p className="mb-4 text-sm text-gray-400">
              Primeiro mês promocional: R$ 29,90
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-300">
              <li>Mensagens ilimitadas</li>
              <li>Acesso completo ao RAWN PRO</li>
              <li>Atualizações contínuas</li>
              <li>Suporte prioritário</li>
            </ul>
            <Link
              href="/plans"
              className="block w-full rounded-xl bg-emerald-400 py-3 text-center font-bold text-black transition hover:bg-emerald-300"
            >
              Assinar Agora
            </Link>
          </div>

          {/* Vitalício */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-6">
            <div className="mb-2 inline-block rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-black">
              MELHOR VALOR
            </div>
            <h3 className="mb-2 text-xl font-bold">Vitalício</h3>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">R$ 449,90</span>
            </div>
            <p className="mb-4 text-sm text-emerald-300">
              Pagamento único • Acesso para sempre
            </p>
            <ul className="mb-6 space-y-2 text-sm text-gray-200">
              <li>Tudo do plano mensal</li>
              <li>Sem mensalidades</li>
              <li>Suporte VIP</li>
              <li>Atualizações futuras</li>
            </ul>
            <Link
              href="/plans"
              className="block w-full rounded-xl bg-emerald-400 py-3 text-center font-bold text-black transition hover:bg-emerald-300"
            >
              Garantir Vitalício
            </Link>
          </div>
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
            <div className="text-sm text-gray-500">© 2025 RAWN PRO</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
