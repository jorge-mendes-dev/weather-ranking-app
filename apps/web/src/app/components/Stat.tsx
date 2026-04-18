interface StatProps {
  label: string;
  value: string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div>
      <div className="text-xs text-text-weak uppercase tracking-wide">
        {label}
      </div>
      <div className="font-semibold text-base">{value}</div>
    </div>
  );
}
