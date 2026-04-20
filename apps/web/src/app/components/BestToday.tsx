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
    <section className="card mb-6 bg-white border border-border rounded-card px-8 py-6 shadow-card font-display transition-all duration-150 hover:border-brand hover:shadow-md">
      <h2 className="text-2xl font-semibold mb-3 tracking-tight text-text">
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
