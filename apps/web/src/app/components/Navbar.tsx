import { LanguageSelector } from "./LanguageSelector";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-5 px-8 border-b border-border border-sm bg-blue-500 mb-10">
      <span className="text-display-bold font-haas-disp tracking-wide text-white">
        Weather Ranking
      </span>
      <LanguageSelector />
    </nav>
  );
}
