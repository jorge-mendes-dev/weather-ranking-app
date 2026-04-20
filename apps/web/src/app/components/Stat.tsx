interface StatProps {
  label: string;
  value: string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-display">
        {label}
      </div>
      <div className="font-display text-lg font-semibold tracking-normal text-text">
        {value}
      </div>
    </div>
  );
}
