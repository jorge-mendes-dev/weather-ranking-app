export function TempIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20">
      <path
        d="M10 2a2 2 0 0 1 2 2v7.17a3 3 0 1 1-4 0V4a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="15"
        r="3"
        fill="currentColor"
        className="text-orange-200"
      />
    </svg>
  );
}
