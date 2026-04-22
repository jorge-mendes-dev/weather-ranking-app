"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  onClear?: () => void;
  icon?: React.ReactNode;
}

import { SearchIcon } from "./SearchIcon";

/**
 * Search bar component with input and submit button.
 * @param {SearchBarProps} props - The props for the component.
 */
export function SearchBar({
  placeholder = "Search...",
  onSearch,
  onClear,
  icon,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
  }

  function handleClear() {
    setValue("");
    onClear?.();
  }

  const { t } = useTranslation();
  const showClear = value.length > 0 && !!onClear;
  const isSearchEnabled = value.trim().length > 0;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-1 sm:gap-2 w-full max-w-full sm:max-w-md md:max-w-xl bg-white border border-gray-100 rounded-2xl shadow-card px-2 sm:px-3 py-1.5 sm:py-2 transition"
      role="search"
    >
      {icon || (
        <span className="text-gray-400 flex items-center justify-center">
          <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </span>
      )}
      <input
        type="text"
        className="flex-1 min-w-0 h-10 sm:h-12 border-none bg-transparent outline-none text-base font-display tracking-normal placeholder-gray-400 focus:ring-2 focus:ring-brand focus:border-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label={placeholder}
        autoFocus
      />

      <button
        type="submit"
        className={`ml-1 sm:ml-2 px-4 sm:px-5 h-10 sm:h-12 min-w-10 bg-brand text-white rounded-full font-medium text-[15px] shadow-button hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-transform active:scale-95${!isSearchEnabled ? " opacity-50 cursor-not-allowed" : ""}`}
        style={{ backgroundColor: "var(--color-brand, #18E299)" }}
        aria-label={t("searchbar.aria_label")}
        disabled={!isSearchEnabled}
      >
        {t("searchbar.button") || "Search"}
      </button>
      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          className="ml-1 sm:ml-2 px-4 sm:px-5 h-10 sm:h-12 min-w-10 bg-error/10 text-error rounded-full font-medium text-[15px] shadow-button hover:bg-error/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-error transition-transform active:scale-95 hover:opacity-90"
          aria-label={t("searchbar.clear_aria_label")}
        >
          {t("searchbar.clear_button")}
        </button>
      )}
    </form>
  );
}
