"use client";

import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

/**
 * Main navigation bar with app title and language selector.
 */
export function Navbar() {
  const { t } = useTranslation();
  return (
    <nav
      className="sticky top-0 z-30 w-full flex items-center justify-between px-4 md:px-10 h-16 border-b border-(--border-subtle) bg-white/95 backdrop-blur-xl font-display shadow-[0_2px_16px_0_rgba(24,97,201,0.06)]"
      style={{
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      <a
        href="/"
        className="text-[1.6rem] md:text-2xl font-semibold tracking-[-1.1px] text-(--color-text) select-none drop-shadow-sm hover:text-(--color-brand) transition-colors duration-200 px-2 py-1 rounded-(--radius-pill) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
        style={{ letterSpacing: "-1.1px", fontFamily: "var(--font-display)" }}
      >
        {t("navbar.title")}
      </a>
      <div className="flex items-center gap-2 px-3 py-1">
        <LanguageSelector />
      </div>
    </nav>
  );
}
