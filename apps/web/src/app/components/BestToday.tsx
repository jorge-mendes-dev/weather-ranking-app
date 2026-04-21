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
    <section className="bg-white/95 border border-gray-300 rounded-2xl p-6 font-display shadow-[0_4px_32px_0_rgba(27,97,201,0.07)] transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(27,97,201,0.13)] hover:bg-blue-50/30 hover:-translate-y-1 hover:scale-[1.025] focus:shadow-xl focus:border-blue-400 mb-6">
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
