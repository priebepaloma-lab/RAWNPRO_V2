"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Profile {
  name: string;
  focus: string;
  style: string;
}

interface ProfileContextValue {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
}

const defaultProfile: Profile = { name: "", focus: "rotina", style: "humano" };
const ProfileContext = createContext<ProfileContextValue>({
  profile: defaultProfile,
  updateProfile: () => {},
});

const STORAGE_KEY = "rawn.user.profile";

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfile(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const updateProfile = (data: Partial<Profile>) =>
    setProfile((prev) => ({ ...prev, ...data }));

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
