import { SparklesIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { ActivityItem } from "./ActivityItem";

interface BestTodayProps {
  activity: string;
  score: number;
  reasoning: string;
  icon?: React.ReactNode;
}

/**
 * Displays the best activity for today with score and reasoning.
 * @param {BestTodayProps} props - The props for the component.
 */
export function BestToday({
  activity,
  score,
  reasoning,
  icon,
}: BestTodayProps) {
  const { t } = useTranslation();
  return (
    <section className="bg-white/95 border border-gray-300 rounded-2xl p-6 font-display emil-shadow-card emil-shadow-card-hover emil-spring emil-fadein mb-6">
      <h2 className="text-xl font-bold mb-3 tracking-tight text-color-text drop-shadow-sm">
        {t("best_activity_today")}
      </h2>
      <ActivityItem
        activity={activity}
        score={score}
        reasoning={reasoning}
        isBest
        icon={
          icon ?? (
            <SparklesIcon
              className="h-6 w-6 text-blue-500 drop-shadow-md"
              aria-hidden="true"
            />
          )
        }
      />
    </section>
  );
}
