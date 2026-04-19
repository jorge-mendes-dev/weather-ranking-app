interface StatProps {
  label: string;
  value: string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div>
      <div className="text-caption text-text-weak uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="font-haas text-feature font-semibold tracking-normal">
        {value}
      </div>
    </div>
  );
}
