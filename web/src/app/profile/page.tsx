"use client";
import React from "react";
import { ProfileForm } from "./ProfileForm";

export default function ProfilePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#101010] text-white">
      <h1 className="text-3xl font-bold text-[#00FF9C] mb-8">
        Perfil RAWN PRO
      </h1>
      <ProfileForm />
    </main>
  );
}
