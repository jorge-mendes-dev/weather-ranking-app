export function PrecipIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20">
      <path
        d="M10 2v12m0 0c-2.5 0-4.5-2-4.5-4.5S7.5 5 10 5s4.5 2 4.5 4.5S12.5 14 10 14z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
