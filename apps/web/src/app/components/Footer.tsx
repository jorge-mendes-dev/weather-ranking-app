"use client";

/**
 * Footer component for app-wide usage.
 * Displays creator info with a link, styled per design system.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(0,0,0,0.05)] bg-white py-6 flex items-center justify-center text-gray-700 text-sm font-medium tracking-wide select-none emil-fadein">
      <span>
        Created by{" "}
        <a
          href="https://jorgemendes.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1b61c9] px-1 rounded-full transition-colors emil-underline emil-spring"
        >
          Jorge Mendes
        </a>
      </span>
    </footer>
  );
}
