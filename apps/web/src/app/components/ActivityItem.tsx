interface ActivityItemProps {
  activity: string;
  score: number;
  reasoning: string;
  isBest?: boolean;
  icon?: React.ReactNode;
}

export function ActivityItem({
  activity,
  score,
  reasoning,
  isBest,
  icon,
}: ActivityItemProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-gray-400";
  };

  return (
    <div className={`flex items-center gap-3 ${isBest ? "font-bold" : ""}`}>
      {icon && <span className="text-xl">{icon}</span>}
      <span className={`capitalize ${isBest ? "text-lg" : "text-base"}`}>
        {activity}
      </span>
      <span className={`ml-auto font-mono ${getScoreColor(score)}`}>
        {score}/10
      </span>
      {isBest && (
        <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">
          Best
        </span>
      )}
      <span className="ml-4 text-xs text-gray-500">{reasoning}</span>
    </div>
  );
}
