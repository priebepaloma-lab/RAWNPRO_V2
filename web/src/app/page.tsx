"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Shield,
  CheckCircle2,
  Dumbbell,
  Moon,
  Target,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function LandingFitness() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Fixo */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 border-b border-[#00FF9C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
          <img src="/brand/header-48.png" alt="RAWN PRO" className="h-12" />
        </div>
      </header>{" "}
      {/* Hero Section - IMPACTO MÁXIMO */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00FF9C]/5 blur-[120px] rounded-full" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge de autoridade */}
            <div className="inline-flex items-center gap-2 bg-[#00FF9C]/10 border border-[#00FF9C]/30 rounded-full px-6 py-3 mb-8">
              <Brain className="w-5 h-5 text-[#00FF9C]" />
              <span className="text-[#00FF9C] font-semibold">
                IA Especializada em Performance Humana
              </span>
            </div>

            {/* Headline - DOR + DESEJO */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Pare de Confiar em
              <span className="block text-[#00FF9C] mt-2">
                Respostas Genéricas de IA
              </span>
            </h1>

            {/* Subheadline - SOLUÇÃO + PROVA */}
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Conheça o{" "}
              <strong className="text-white">
                primeiro treinador de elite 24/7
              </strong>{" "}
              especializado em{" "}
              <strong className="text-white">
                treino, nutrição, sono e performance
              </strong>{" "}
              — baseado em evidências científicas validadas por{" "}
              <strong className="text-[#00FF9C]">ACSM, WHO e IOC</strong>.
            </p>

            {/* Proof Point - DIFERENCIAL */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-white font-semibold mb-2">
                    ChatGPT, Gemini e outras IAs abertas NÃO são treinadas para
                    fitness.
                  </p>
                  <p className="text-gray-300 text-sm">
                    Elas podem dar respostas contraditórias, perigosas ou
                    desatualizadas. O RAWN PRO foi{" "}
                    <strong className="text-[#00FF9C]">
                      treinado exclusivamente
                    </strong>{" "}
                    com protocolos científicos de performance humana.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Principal - IRRESISTÍVEL */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://pay.kiwify.com.br/uSs6hgG"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-[#00FF9C] hover:bg-[#00DD88] text-black font-bold text-xl rounded-xl transition-all shadow-[0_0_30px_rgba(0,255,156,0.3)] hover:shadow-[0_0_50px_rgba(0,255,156,0.5)] flex items-center justify-center gap-3"
              >
                Começar Agora por R$ 19,90
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#comparacao"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xl rounded-xl transition-all border border-white/20"
              >
                Ver Comparativo
              </a>
            </div>

            {/* Social Proof Rápido */}
            <p className="text-gray-400 text-sm">
              <span className="text-[#00FF9C] font-semibold">
                +5.000 atletas e praticantes
              </span>{" "}
              já treinam com base científica
            </p>
          </motion.div>
        </div>
      </section>
      {/* Stats - PROVA SOCIAL */}
      <section className="py-16 bg-[#00FF9C]/5 border-y border-[#00FF9C]/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "5.000+", label: "Usuários Ativos" },
              { icon: TrendingUp, value: "98%", label: "Taxa de Satisfação" },
              { icon: Award, value: "100%", label: "Base Científica" },
              { icon: Clock, value: "24/7", label: "Disponibilidade" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="w-10 h-10 text-[#00FF9C] mx-auto mb-3" />
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Problema vs Solução - COMPARAÇÃO ESTRATÉGICA */}
      <section className="py-20 px-4" id="comparacao">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Por Que o RAWN PRO é Diferente?
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Enquanto IAs genéricas dão respostas superficiais, o RAWN PRO
            entrega{" "}
            <strong className="text-[#00FF9C]">precisão científica</strong> em
            cada mensagem.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Coluna: IAs Genéricas (Problema) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-red-900/10 border-2 border-red-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <h3 className="text-2xl font-bold text-white">IAs Abertas</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Treinadas em "tudo" - sem especialização real',
                  "Respostas genéricas copiadas da internet",
                  "Podem sugerir exercícios perigosos ou desatualizados",
                  "Sem base científica validada",
                  "Não entendem contexto de lesões ou limitações",
                  "Informações contraditórias entre conversas",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Coluna: RAWN PRO (Solução) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#00FF9C]/10 border-2 border-[#00FF9C]/50 rounded-2xl p-8 relative"
            >
              <div className="absolute -top-4 right-8">
                <span className="bg-[#00FF9C] text-black px-4 py-1 rounded-full text-sm font-bold">
                  ESPECIALISTA
                </span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-[#00FF9C]" />
                <h3 className="text-2xl font-bold text-white">RAWN PRO</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Treinado EXCLUSIVAMENTE em performance humana",
                  "Respostas baseadas em ACSM, WHO, IOC, PubMed",
                  "Progressões seguras e individualizadas",
                  "100% validado por evidências científicas",
                  "Considera lesões, objetivos e nível de treino",
                  "Memória contextual para evolução consistente",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#00FF9C] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Proof adicional */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <Shield className="w-12 h-12 text-[#00FF9C] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Treinado com Protocolos de Elite
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Cada resposta do RAWN PRO é validada contra diretrizes da{" "}
              <strong className="text-white">
                American College of Sports Medicine (ACSM)
              </strong>
              ,{" "}
              <strong className="text-white">
                World Health Organization (WHO)
              </strong>{" "}
              e{" "}
              <strong className="text-white">
                International Olympic Committee (IOC)
              </strong>
              . Não é opinião. É ciência.
            </p>
          </div>
        </div>
      </section>
      {/* Especialidades - RELEVÂNCIA E AUTORIDADE */}
      <section className="py-20 px-4 bg-[#00FF9C]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            6 Dimensões da Performance
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            O RAWN PRO atua de forma integrada em todas as áreas que afetam seus
            resultados
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Dumbbell,
                title: "Corpo",
                desc: "Periodização, hipertrofia, força, resistência, mobilidade e técnica de exercícios",
              },
              {
                icon: Target,
                title: "Rotina",
                desc: "Organização de treinos, frequência, volume, intensidade e gestão de tempo",
              },
              {
                icon: Moon,
                title: "Sono",
                desc: "Recuperação muscular, higiene do sono, ritmo circadiano e adaptação",
              },
              {
                icon: Zap,
                title: "Energia",
                desc: "Nutrição esportiva, timing de refeições, hidratação e suplementação baseada em evidências",
              },
              {
                icon: Brain,
                title: "Foco",
                desc: "Concentração no treino, motivação sustentável e mindset de performance",
              },
              {
                icon: Shield,
                title: "Equilíbrio",
                desc: "Prevenção de overtraining, gestão de estresse e longevidade atlética",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-[#00FF9C]/20 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00FF9C]/40 transition-all group"
              >
                <item.icon className="w-12 h-12 text-[#00FF9C] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Benefícios + Preços + CTA + Footer */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <Sparkles className="w-16 h-16 text-[#00FF9C] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Imagine Ter um Treinador de Elite
            <span className="block text-[#00FF9C] mt-2">
              Disponível 24 Horas no Seu Bolso
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Sem horário marcado. Sem julgamentos.{" "}
            <strong className="text-white">
              Apenas você e um coach científico que entende exatamente o que
              você precisa
            </strong>
            .
          </p>
        </div>

        {/* Preços */}
        <div className="max-w-6xl mx-auto" id="planos">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Invista na sua evolução.{" "}
            <strong className="text-[#00FF9C]">Garantia de 7 dias</strong> ou
            devolução total.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border-2 border-[#00FF9C]/30 rounded-3xl p-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Plano Mensal
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-extrabold text-[#00FF9C]">
                    R$ 19,90
                  </span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-400">Depois R$ 49,90/mês</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Conversas ilimitadas",
                  "Todas as 6 dimensões",
                  "Base científica (ACSM/WHO/IOC)",
                  "Acesso 24/7",
                  "Suporte prioritário",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#00FF9C] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.kiwify.com.br/uSs6hgG"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-[#00FF9C] hover:bg-[#00DD88] text-black font-bold rounded-xl text-center transition-all shadow-[0_0_20px_rgba(0,255,156,0.3)]"
              >
                Começar Agora
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#00FF9C]/20 to-[#00DD88]/10 border-2 border-[#00FF9C] rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-[#00FF9C] text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  MELHOR VALOR
                </span>
              </div>

              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Plano Vitalício
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-extrabold text-[#00FF9C]">
                    R$ 299
                  </span>
                </div>
                <p className="text-sm text-[#00FF9C]">
                  Pagamento único. Acesso para sempre!
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "TUDO do plano mensal",
                  "Acesso vitalício",
                  "Sem mensalidades (economia 80%)",
                  "Atualizações futuras",
                  "Suporte VIP",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-sm font-semibold"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#00FF9C] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.kiwify.com.br/ocIXXfO"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-[#00FF9C] hover:bg-[#00DD88] text-black font-bold rounded-xl text-center transition-all shadow-[0_0_30px_rgba(0,255,156,0.4)]"
              >
                Garantir Vitalício Agora
              </a>
            </motion.div>
          </div>

          {/* Garantia */}
          <div className="bg-[#00FF9C]/10 border border-[#00FF9C]/30 rounded-2xl p-8 max-w-2xl mx-auto text-center">
            <Shield className="w-16 h-16 text-[#00FF9C] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Garantia Incondicional de 7 Dias
            </h3>
            <p className="text-gray-300">
              Teste sem riscos. Se não ficar satisfeito, devolvemos{" "}
              <strong className="text-[#00FF9C]">100% do seu dinheiro</strong>.
              Sem perguntas.
            </p>
          </div>
        </div>
      </section>
      {/* CTA Final */}
      <section className="py-20 px-4 bg-[#00FF9C]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pare de Treinar no Escuro
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Cada dia sem orientação científica é um dia perdido.
            <br />
            Comece agora com o{" "}
            <strong className="text-[#00FF9C]">
              primeiro treinador de elite baseado em IA especializada
            </strong>
            .
          </p>
          <a
            href="https://pay.kiwify.com.br/uSs6hgG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#00FF9C] hover:bg-[#00DD88] text-black font-bold text-xl rounded-xl transition-all shadow-[0_0_40px_rgba(0,255,156,0.4)] group"
          >
            Começar Agora por R$ 19,90
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
          <p className="text-gray-400 text-sm mt-6">
            ⚡ Acesso imediato • 🔒 Garantia de 7 dias
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-[#00FF9C]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#00FF9C] mb-4">
                RAWN PRO
              </h3>
              <p className="text-gray-400 text-sm">
                Inteligência aplicada à performance humana.
                <br />
                Ciência que fala com você.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/chat"
                    className="text-gray-400 hover:text-[#00FF9C] transition-colors"
                  >
                    Acessar Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-[#00FF9C] transition-colors"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-[#00FF9C] transition-colors"
                  >
                    Termos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-gray-400 hover:text-[#00FF9C] transition-colors"
                  >
                    Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Suporte</h4>
              <p className="text-gray-400 text-sm">
                Dúvidas? Entre em contato através do chat após fazer login.
              </p>
            </div>
          </div>
          <div className="border-t border-[#00FF9C]/20 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 RAWN PRO. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">
              Baseado em evidências científicas. Não substitui acompanhamento
              profissional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
