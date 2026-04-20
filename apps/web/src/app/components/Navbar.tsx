"use client";

import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="sticky top-0 z-30 w-full flex items-center justify-between px-4 md:px-8 h-14 border-b border-gray-200 bg-white/80 backdrop-blur font-display">
      <span className="text-lg md:text-xl font-semibold tracking-tight text-color-text select-none">
        {t("navbar.title")}
      </span>
      <div className="flex items-center gap-2">
        <LanguageSelector />
      </div>
    </nav>
  );
}
