import { useTranslation } from "react-i18next";
import { ActivityItem } from "./ActivityItem";

interface BestTodayProps {
  activity: string;
  score: number;
  reasoning: string;
  icon?: React.ReactNode;
}

export function BestToday({
  activity,
  score,
  reasoning,
  icon,
}: BestTodayProps) {
  const { t } = useTranslation();
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 font-display transition-all duration-200 hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 hover:scale-[1.02] focus:shadow-xl focus:border-blue-300 mb-4">
      <h2 className="text-xl font-semibold mb-2 tracking-tight text-gray-900">
        {t("best_activity_today")}
      </h2>
      <ActivityItem
        activity={activity}
        score={score}
        reasoning={reasoning}
        isBest
        icon={icon}
      />
    </section>
  );
}
