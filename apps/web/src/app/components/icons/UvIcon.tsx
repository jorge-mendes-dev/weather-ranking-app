export function UvIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2v2m0 12v2m8-8h-2M4 10H2m13.07-5.07l-1.42 1.42M6.34 17.66l-1.42-1.42m0-11.32l1.42 1.42m11.32 11.32l-1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
