"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useProfile } from "./ProfileContext";
import { useToast } from "@/components/ToastProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, saveProfile } = useProfile();
  const toast = useToast();

  const [formData, setFormData] = React.useState({
    name: profile?.name || "",
    ageRange: profile?.ageRange || "",
    level: profile?.level || "",
    goal: profile?.goal || "",
    limitation: profile?.limitation || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveProfile(formData);

    // Marca que o primeiro acesso foi concluído
    localStorage.setItem("firstRunComplete", "true");
    // Marca para feedback ao retornar ao chat
    localStorage.setItem("profileSaved", "true");

    // Feedback imediato
    try {
      toast.success("Perfil atualizado");
    } catch {}

    // Redireciona para o chat
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValid =
    formData.name && formData.ageRange && formData.level && formData.goal;

  return (
    <div className="min-h-screen bg-rawn-bg-base flex flex-col items-center px-4 py-12 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[720px]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-3">
            Editar Perfil
          </h1>
          <p className="text-sm text-white/90 leading-relaxed max-w-xl mx-auto">
            Essas informações ajudam o RAWN PRO a entender seu ponto de partida
            e adaptar as orientações com segurança e precisão.
          </p>
          <p className="text-xs text-white/70 mt-2">
            Os dados ficam apenas no seu dispositivo e podem ser apagados a
            qualquer momento.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          <div className="rounded-lg border border-rawn-border-panel bg-[#4A4A4A] backdrop-blur-sm p-8 mb-6 space-y-6">
            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-rawn-text-primary mb-2"
              >
                Como prefere ser chamado nas conversas
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Rafael ou Rafa"
                className="w-full rounded-md border border-white/25 bg-[#3A3A3A] px-4 py-3 text-sm text-white placeholder:text-white/70 focus:border-rawn-accent-neon focus:outline-none focus:ring-2 focus:ring-rawn-accent-neon/35 transition-all"
              />
            </div>

            {/* Faixa de idade */}
            <div>
              <label
                htmlFor="ageRange"
                className="block text-sm font-medium text-rawn-text-primary mb-2"
              >
                Selecione sua faixa de idade
              </label>
              <select
                id="ageRange"
                name="ageRange"
                value={formData.ageRange}
                onChange={handleChange}
                className="w-full rounded-md border border-white/25 bg-[#3A3A3A] px-4 py-3 text-sm text-white focus:border-rawn-accent-neon focus:outline-none focus:ring-2 focus:ring-rawn-accent-neon/35 transition-all"
              >
                <option value="">Selecione</option>
                <option value="14-18">14 a 18 anos</option>
                <option value="19-39">19 a 39 anos</option>
                <option value="40-60">40 a 60 anos</option>
                <option value="60+">60 anos ou mais</option>
              </select>
            </div>

            {/* Nível de prática */}
            <div>
              <label className="block text-sm font-medium text-rawn-text-primary mb-3">
                Escolha o estágio que melhor representa sua experiência atual
              </label>
              <div className="flex flex-wrap gap-3">
                {["Iniciante", "Intermediário", "Avançado"].map((level) => (
                  <label
                    key={level}
                    className={[
                      "flex-1 min-w-[120px] rounded-md border px-4 py-3 text-center text-sm font-medium cursor-pointer transition-all",
                      formData.level === level
                        ? "border-rawn-accent-neon bg-rawn-accent-neon/10 text-rawn-accent-neon shadow-neon-focus"
                        : "border-white/20 text-white/80 hover:border-rawn-accent-neon/50 hover:text-white",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={formData.level === level}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Objetivo principal */}
            <div>
              <label className="block text-sm font-medium text-rawn-text-primary mb-3">
                Indique o foco que melhor representa sua meta atual
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Emagrecimento",
                  "Ganho de músculos",
                  "Performance",
                  "Resistência",
                  "Mobilidade",
                  "Vitalidade",
                ].map((goal) => (
                  <label
                    key={goal}
                    className={[
                      "rounded-md border px-4 py-3 text-center text-sm font-medium cursor-pointer transition-all",
                      formData.goal === goal
                        ? "border-rawn-accent-neon bg-rawn-accent-neon/10 text-rawn-accent-neon shadow-neon-focus"
                        : "border-white/20 text-white/80 hover:border-rawn-accent-neon/50 hover:text-white",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={goal}
                      checked={formData.goal === goal}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {goal}
                  </label>
                ))}
              </div>
            </div>

            {/* Limitação */}
            <div>
              <label
                htmlFor="limitation"
                className="block text-sm font-medium text-rawn-text-primary mb-2"
              >
                Limitação ou condição especial{" "}
                <span className="text-rawn-text-muted font-normal">
                  (opcional)
                </span>
              </label>
              <p className="text-xs text-white/80 mb-3">
                Descreva, se desejar, qualquer fator físico, clínico ou
                circunstancial que o RAWN PRO deva considerar para garantir
                segurança nas orientações.
              </p>
              <textarea
                id="limitation"
                name="limitation"
                value={formData.limitation}
                onChange={handleChange}
                rows={4}
                placeholder="Ex: Tenho problema no joelho direito, evito impacto..."
                className="w-full rounded-md border border-white/25 bg-[#3A3A3A] px-4 py-3 text-sm text-white placeholder:text-white/70 focus:border-rawn-accent-neon focus:outline-none focus:ring-2 focus:ring-rawn-accent-neon/35 transition-all resize-none"
              />
            </div>

            {/* Privacy Notice */}
            <div className="border-t border-white/15 pt-6">
              <p className="text-xs text-white/70 leading-relaxed">
                Essas informações são armazenadas apenas no seu dispositivo. O
                RAWN PRO não envia, compartilha nem armazena dados em servidores
                externos. Você pode apagá-los a qualquer momento.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!isValid}
            whileHover={{ scale: isValid ? 1.02 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            className={[
              "w-full rounded-pill px-8 py-4 text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rawn-bg-base",
              isValid
                ? "bg-rawn-accent-neon text-black shadow-neon-glow hover:shadow-neon-focus hover:brightness-110 focus:ring-rawn-accent-neon cursor-pointer"
                : "bg-rawn-bg-surface text-rawn-text-muted cursor-not-allowed opacity-50",
            ].join(" ")}
          >
            SALVAR E VOLTAR AO CHAT
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
