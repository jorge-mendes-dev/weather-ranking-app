import { ActivityItem } from "./ActivityItem";

interface DayCardProps {
  date: string;
  weatherLabel: string;
  bestActivity: string;
  bestScore: number;
  bestReasoning: string;
  activities: Array<{
    type: string;
    score: number;
    reasoning: string;
  }>;
  icon?: React.ReactNode;
}

export function DayCard({
  date,
  weatherLabel,
  bestActivity,
  bestScore,
  bestReasoning,
  activities,
  icon,
}: DayCardProps) {
  return (
    <div className="card mb-8 rounded-card shadow-blue-tint px-8 py-6">
      <div className="flex items-center gap-4 mb-3">
        <span className="font-haas text-card-title font-semibold tracking-wide text-navy">
          {date}
        </span>
        <span className="ml-3 text-caption text-text-weak">{weatherLabel}</span>
      </div>
      <ActivityItem
        activity={bestActivity}
        score={bestScore}
        reasoning={bestReasoning}
        isBest
        icon={icon}
      />
      <div className="mt-3 flex flex-col gap-2">
        {activities
          .filter((a) => a.type !== bestActivity)
          .map((a) => (
            <ActivityItem
              key={a.type}
              activity={a.type}
              score={a.score}
              reasoning={a.reasoning}
            />
          ))}
      </div>
    </div>
  );
}
