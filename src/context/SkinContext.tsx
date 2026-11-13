"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Skin } from "@/types";

interface SkinContextType {
  skin: Skin;
  setSkin: (skin: Skin) => void;
  cycleSkin: () => void;
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

const SKINS: Skin[] = ["phosphor", "ivory", "riso"];

export function SkinProvider({ children }: { children: React.ReactNode }) {
  const [skin, setSkinState] = useState<Skin>("phosphor");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("shivang_skin") as Skin;
    if (saved && SKINS.includes(saved)) {
      setSkinState(saved);
      document.documentElement.setAttribute("data-skin", saved);
    } else {
      document.documentElement.setAttribute("data-skin", "phosphor");
    }
  }, []);

  const setSkin = (newSkin: Skin) => {
    setSkinState(newSkin);
    localStorage.setItem("shivang_skin", newSkin);
    document.documentElement.setAttribute("data-skin", newSkin);
  };

  const cycleSkin = () => {
    const currentIndex = SKINS.indexOf(skin);
    const nextIndex = (currentIndex + 1) % SKINS.length;
    setSkin(SKINS[nextIndex]);
  };

  // Keyboard shortcut: Shift + T to toggle themes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "t" || e.key === "T") && e.shiftKey && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        cycleSkin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <SkinContext.Provider value={{ skin, setSkin, cycleSkin }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin() {
  const context = useContext(SkinContext);
  if (!context) {
    throw new Error("useSkin must be used within a SkinProvider");
  }
  return context;
}
