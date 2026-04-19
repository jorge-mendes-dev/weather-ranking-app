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
    <section className="card mb-6">
      <h2 className="text-section-heading font-haas mb-3 font-normal tracking-wide text-navy">
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
