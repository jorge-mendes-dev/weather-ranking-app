import { useTranslation } from "react-i18next";
import { ActivityItem } from "./ActivityItem";

interface BestDayProps {
  day: {
    date: string;
    bestActivity: string;
    bestScore: number;
    reasoning: string;
    icon?: React.ReactNode;
  };
}

export function BestDay({ day }: BestDayProps) {
  const { t } = useTranslation();
  return (
    <section className="card mb-6">
      <h2 className="text-section-heading font-haas mb-3 font-normal tracking-wide text-navy">
        {t("best_day_this_week")}
      </h2>
      <div className="flex flex-col gap-2">
        <span className="text-caption text-text-weak">{day.date}</span>
        <ActivityItem
          activity={day.bestActivity}
          score={day.bestScore}
          reasoning={day.reasoning}
          isBest
          icon={day.icon}
        />
      </div>
    </section>
  );
}
