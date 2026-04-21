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
      className="flex items-center gap-2 w-full max-w-xl bg-white border border-gray-100 rounded-lg shadow px-3 py-2 transition"
      role="search"
    >
      {icon || (
        <span className="text-gray-400">
          <SearchIcon className="w-6 h-6" />
        </span>
      )}
      <input
        type="text"
        className="flex-1 h-12 border-none bg-transparent outline-none text-base font-display tracking-normal placeholder-gray-400 focus:ring-0 focus:border-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label={placeholder}
        autoFocus
      />

      <button
        type="submit"
        className={`ml-2 px-5 h-10 bg-blue-600 text-white rounded-lg font-medium text-base shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition${!isSearchEnabled ? " opacity-50 cursor-not-allowed" : ""}`}
        aria-label={t("searchbar.aria_label")}
        disabled={!isSearchEnabled}
      >
        {t("searchbar.button")}
      </button>
      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          className="ml-2 px-5 h-10 bg-red-100 text-red-700 rounded-lg font-medium text-base shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          aria-label={t("searchbar.clear_aria_label")}
        >
          {t("searchbar.clear_button")}
        </button>
      )}
    </form>
  );
}
