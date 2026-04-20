import { LanguageSelector } from "./LanguageSelector";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 w-full flex items-center justify-between py-5 px-8 border-b border-border bg-color-bg/80 backdrop-blur-md shadow-card font-display">
      <span className="text-2xl font-semibold tracking-tight text-color-text select-none">
        Weather Ranking
      </span>
      <div className="flex items-center gap-4">
        <button className="hidden md:inline-block bg-color-text text-color-bg px-6 py-2 rounded-pill font-medium shadow-card hover:opacity-90 transition">
          Get Started
        </button>
        <LanguageSelector />
      </div>
    </nav>
  );
}
