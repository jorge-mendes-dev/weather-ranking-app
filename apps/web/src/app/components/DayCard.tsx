import { CloudIcon, SparklesIcon } from "@heroicons/react/24/outline";

import { formatDate } from "../utils/formatDate";
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

/**
 * Renders a card for a single day, showing the best activity and other activities.
 * @param {DayCardProps} props - The props for the component.
 */
export function DayCard({
  date,
  weatherLabel,
  bestActivity,
  bestScore,
  bestReasoning,
  activities,
  icon,
}: DayCardProps) {
  const formattedDate = formatDate(date);

  return (
    <div className="bg-white/95 border border-gray-300 rounded-2xl p-6 font-display emil-shadow-card emil-shadow-card-hover emil-spring emil-fadein mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-lg font-bold text-color-text tracking-tight leading-tight drop-shadow-sm">
          {formattedDate}
        </span>
        <CloudIcon
          className="h-5 w-5 text-blue-400 opacity-80"
          aria-hidden="true"
        />
        {weatherLabel && (
          <span className="ml-2 text-sm text-blue-600/80 font-medium tracking-wide">
            {weatherLabel}
          </span>
        )}
      </div>
      <ActivityItem
        activity={bestActivity}
        score={bestScore}
        reasoning={bestReasoning}
        isBest
        icon={
          icon ?? (
            <SparklesIcon
              className="h-5 w-5 text-blue-500 drop-shadow-md"
              aria-hidden="true"
            />
          )
        }
      />
      <div className="mt-4 flex flex-col gap-2">
        {activities
          .filter((a) => a.type !== bestActivity)
          .map((a) => (
            <ActivityItem
              key={a.type}
              activity={a.type}
              score={a.score}
              reasoning={a.reasoning}
              icon={
                <SparklesIcon
                  className="h-4 w-4 text-blue-200 opacity-70"
                  aria-hidden="true"
                />
              }
            />
          ))}
      </div>
    </div>
  );
}
