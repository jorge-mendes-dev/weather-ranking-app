"use client";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const LANGS = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
];

export function LanguageSelector() {
  const { i18n: i18next } = useTranslation();
  const current = i18next.language || "en";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <select
      className="ml-2 px-2 py-1 rounded border border-border border-rounded bg-white text-sm"
      value={current}
      onChange={handleChange}
      aria-label="Select language"
    >
      {LANGS.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
