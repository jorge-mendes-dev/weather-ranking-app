interface BestDayProps {
  date: string;
  activity: string;
  score: number;
}

export function BestDay({ date, activity, score }: BestDayProps) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-text mb-2 font-display">
        Best Day This Week
      </div>
      <div className="bg-white border border-brand rounded-card px-6 py-4 shadow-card flex items-center gap-2">
        <span className="font-bold text-brand mr-2">{date}</span>
        <span className="capitalize font-semibold text-text">{activity}</span>
        <span className="ml-2 text-brand font-mono">{score}/10</span>
      </div>
    </div>
  );
}
