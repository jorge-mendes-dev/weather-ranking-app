"use client";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  icon?: React.ReactNode;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full max-w-md"
    >
      {icon}
      <input
        type="text"
        className="flex-1 border border-border rounded-pill px-5 py-2 text-base font-display tracking-normal focus:outline-none focus:ring-2 focus:ring-brand bg-white transition-all"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label={placeholder}
      />
      <button
        type="submit"
        className="ml-2 px-6 py-2 bg-brand text-color-text rounded-pill font-display font-medium text-base tracking-wide shadow-card hover:bg-brand-deep hover:text-white transition-all"
      >
        Search
      </button>
    </form>
  );
}
