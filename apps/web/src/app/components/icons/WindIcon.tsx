export function WindIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20">
      <path
        d="M3 10h10a3 3 0 1 1 0 6H5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
