import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-brand";
    if (score >= 40) return "text-warn";
    return "text-gray-400";
  };

  return (
    <div
      className={`flex items-center gap-4 ${isBest ? "font-bold" : ""} font-display transition-all duration-150`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span
        className={`capitalize text-base tracking-tight text-text ${isBest ? "font-semibold" : ""}`}
      >
        {activity}
      </span>
      <span
        className={`ml-auto font-mono text-xs uppercase tracking-widest px-2 py-1 rounded-pill bg-gray-50 ${getScoreColor(score)} transition-colors`}
      >
        {score}/10
      </span>
      {isBest && (
        <span className="ml-2 px-2 py-0.5 rounded-pill bg-brand-light text-brand-deep text-xs font-semibold animate-pulse">
          {t("best")}
        </span>
      )}
      <span className="ml-4 text-sm text-gray-500">{reasoning}</span>
    </div>
  );
}
