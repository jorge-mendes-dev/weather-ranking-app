interface StatProps {
  label: string;
  value: string;
}

/**
 * Displays a single stat with label and value.
 * @param {StatProps} props - The props for the component.
 */
export function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col min-w-20">
      <div className="text-xs text-blue-700/80 uppercase tracking-wider mb-1 font-display font-bold drop-shadow-sm">
        {label}
      </div>
      <div className="font-display text-lg font-bold tracking-tight text-color-text">
        {value}
      </div>
    </div>
  );
}
