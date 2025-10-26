"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "./ProfileContext";

export const ProfileForm = () => {
  const { profile, updateProfile } = useProfile();
  const [form, setForm] = useState(profile);

  useEffect(() => setForm(profile), [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-80 bg-[#111] p-6 rounded-2xl shadow-lg"
    >
      <label className="flex flex-col text-sm">
        Nome:
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 rounded-lg p-2 bg-neutral-900 border border-neutral-700 text-white"
          placeholder="Seu nome"
        />
      </label>

      <label className="flex flex-col text-sm">
        Foco atual:
        <select
          name="focus"
          value={form.focus}
          onChange={handleChange}
          className="mt-1 rounded-lg p-2 bg-neutral-900 border border-neutral-700 text-white"
        >
          <option value="corpo">Corpo</option>
          <option value="rotina">Rotina</option>
          <option value="sono">Sono</option>
          <option value="energia">Energia</option>
          <option value="foco">Foco</option>
          <option value="equilibrio">Equilíbrio</option>
        </select>
      </label>

      <label className="flex flex-col text-sm">
        Estilo cognitivo:
        <select
          name="style"
          value={form.style}
          onChange={handleChange}
          className="mt-1 rounded-lg p-2 bg-neutral-900 border border-neutral-700 text-white"
        >
          <option value="humano">Humano</option>
          <option value="técnico">Técnico</option>
          <option value="sintético">Sintético</option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-[#00FF9C] text-black font-semibold rounded-lg py-2 hover:scale-105 transition-transform"
      >
        Salvar Perfil
      </button>
    </form>
  );
};
