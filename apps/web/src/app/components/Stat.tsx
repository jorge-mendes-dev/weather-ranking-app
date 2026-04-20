interface StatProps {
  label: string;
  value: string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5 font-display">
        {label}
      </div>
      <div className="font-display text-base font-semibold tracking-normal text-gray-800">
        {value}
      </div>
    </div>
  );
}
