"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const LANGS = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
];

/**
 * Language selector dropdown for switching app language.
 */
export function LanguageSelector() {
  const { i18n: i18next } = useTranslation();
  const current = i18next.language || "en";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="relative flex items-center">
      <select
        className="pl-9 pr-10 py-2 rounded-full border border-[rgba(0,0,0,0.05)] bg-white text-sm font-display font-medium shadow-sm focus:ring-2 focus:ring-(--color-brand) focus:border-(--color-brand) transition-colors duration-200 appearance-none cursor-pointer hover:border-(--color-brand) active:scale-95 outline-none"
        value={current}
        onChange={handleChange}
        aria-label="Select language"
        style={{ minWidth: 120 }}
      >
        {LANGS.map((lang) => (
          <option key={lang.code} value={lang.code} className="border rounded">
            {lang.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-gray-400">
        <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
      </span>
    </div>
  );
}
