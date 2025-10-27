"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">RAWN PRO</div>
          <Link
            href="/chat"
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-purple-200 text-sm font-medium">
                IA de Última Geração
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Transforme Suas Ideias em
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Resultados Reais
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              O assistente de IA mais inteligente do mercado. Converse, crie,
              inove e alcance seus objetivos com tecnologia de ponta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pay.kiwify.com.br/uSs6hgG"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Começar Agora por R$ 19,90
              </a>
              <a
                href="#planos"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl transition-all"
              >
                Ver Todos os Planos
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5.000+</div>
              <div className="text-gray-400">Usuários Ativos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Taxa de Satisfação</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-400">Mensagens Processadas</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Por Que Escolher o RAWN PRO?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "IA Avançada",
                description:
                  "Tecnologia de última geração que entende contexto e nuances da linguagem natural.",
              },
              {
                icon: Zap,
                title: "Respostas Instantâneas",
                description:
                  "Processamento ultrarrápido para você não perder tempo esperando.",
              },
              {
                icon: Shield,
                title: "Seguro e Privado",
                description:
                  "Suas conversas são protegidas com criptografia de ponta a ponta.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-black/30" id="planos">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Invista no seu sucesso. Satisfação garantida ou seu dinheiro de
            volta!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Mensal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-8 hover:border-purple-500/60 transition-all"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Plano Mensal
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-extrabold text-white">
                    R$ 19,90
                  </span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-purple-300">
                  No primeiro mês, depois R$ 49,90/mês
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Mensagens ilimitadas",
                  "IA de última geração",
                  "Respostas instantâneas",
                  "Suporte prioritário",
                  "Atualizações automáticas",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.kiwify.com.br/uSs6hgG"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all text-center shadow-lg hover:shadow-xl hover:scale-105"
              >
                Começar Agora
              </a>
            </motion.div>

            {/* Plano Lifetime */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-sm border-2 border-yellow-500/50 rounded-3xl p-8 hover:border-yellow-500/80 transition-all relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MELHOR VALOR
                </span>
              </div>

              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Plano Vitalício
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-extrabold text-white">
                    R$ 299
                  </span>
                </div>
                <p className="text-sm text-yellow-300">
                  Pagamento único. Acesso para sempre!
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "TUDO do plano mensal",
                  "Acesso vitalício garantido",
                  "Sem mensalidades",
                  "Economia de +80%",
                  "Suporte VIP prioritário",
                  "Novas features primeiro",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 fill-yellow-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.kiwify.com.br/ocIXXfO"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg rounded-xl transition-all text-center shadow-lg hover:shadow-xl hover:scale-105"
              >
                Garantir Vitalício
              </a>
            </motion.div>
          </div>

          {/* Garantia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-green-900/20 border border-green-500/30 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Garantia de 7 Dias
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
              Experimente sem riscos!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            O Que Nossos Usuários Dizem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                role: "Empreendedora Digital",
                text: "O RAWN PRO triplicou minha produtividade. Não consigo mais trabalhar sem ele!",
              },
              {
                name: "João Santos",
                role: "Desenvolvedor",
                text: "A melhor IA que já usei. Respostas precisas e contextualizadas sempre.",
              },
              {
                name: "Ana Costa",
                role: "Designer",
                text: "Valeu cada centavo! O plano vitalício foi o melhor investimento que fiz.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto Para Transformar Seu Trabalho?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Junte-se a milhares de profissionais que já estão usando IA para
              alcançar resultados extraordinários.
            </p>
            <a
              href="https://pay.kiwify.com.br/uSs6hgG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-xl transition-all shadow-2xl hover:scale-105"
            >
              Começar Agora por R$ 19,90
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">RAWN PRO</h3>
              <p className="text-gray-400">
                O assistente de IA mais inteligente do mercado brasileiro.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/chat"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Acessar Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plans"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ver Planos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Suporte</h4>
              <p className="text-gray-400">
                Dúvidas? Entre em contato através do chat após fazer login.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RAWN PRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
