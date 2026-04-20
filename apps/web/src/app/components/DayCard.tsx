import { CloudIcon, SparklesIcon } from "@heroicons/react/24/outline";
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
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 font-display transition-all duration-200 hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 hover:scale-[1.02] focus:shadow-xl focus:border-blue-300 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-base font-semibold text-gray-900">{date}</span>
        <CloudIcon className="h-5 w-5 text-blue-300" aria-hidden="true" />
        {weatherLabel && (
          <span className="ml-2 text-sm text-gray-500">{weatherLabel}</span>
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
              className="h-5 w-5 text-blue-500"
              aria-hidden="true"
            />
          )
        }
      />
      <div className="mt-2 flex flex-col gap-1">
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
                  className="h-4 w-4 text-gray-300"
                  aria-hidden="true"
                />
              }
            />
          ))}
      </div>
    </div>
  );
}
