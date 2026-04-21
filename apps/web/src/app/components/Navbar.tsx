"use client";

import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

/**
 * Main navigation bar with app title and language selector.
 */
export function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="sticky top-0 z-30 w-full flex items-center justify-between px-6 md:px-12 h-16 border-b border-border bg-white/90 backdrop-blur font-display shadow-[0_2px_16px_0_rgba(27,97,201,0.04)]">
      <a
        href="/"
        className="text-xl md:text-2xl font-bold tracking-tight text-color-text select-none drop-shadow-sm hover:text-blue-700 transition-colors duration-200"
      >
        {t("navbar.title")}
      </a>
      <div className="flex items-center gap-3">
        <LanguageSelector />
      </div>
    </nav>
  );
}
