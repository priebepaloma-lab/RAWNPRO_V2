"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Profile {
  name: string;
  ageRange?: string;
  level?: string;
  goal?: string;
  limitation?: string;
}

interface ProfileContextValue {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  saveProfile: (data: Partial<Profile>) => void;
}

const defaultProfile: Profile = {
  name: "",
  ageRange: "",
  level: "",
  goal: "",
  limitation: "",
};
const ProfileContext = createContext<ProfileContextValue>({
  profile: defaultProfile,
  updateProfile: () => {},
  saveProfile: () => {},
});

const STORAGE_KEY = "rawn.user.profile";

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega perfil do localStorage uma única vez ao montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Garante que todos os campos estejam presentes
        setProfile({
          name: parsed.name || "",
          ageRange: parsed.ageRange || "",
          level: parsed.level || "",
          goal: parsed.goal || "",
          limitation: parsed.limitation || "",
        });
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sincroniza com localStorage sempre que o perfil mudar (após carregamento inicial)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
    }
  }, [profile, isLoaded]);

  const updateProfile = (data: Partial<Profile>) =>
    setProfile((prev) => ({ ...prev, ...data }));

  const saveProfile = (data: Partial<Profile>) =>
    setProfile((prev) => ({ ...prev, ...data }));

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
