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
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-gray-400";
  };

  return (
    <div className={`flex items-center gap-4 ${isBest ? "font-bold" : ""}`}>
      {icon && <span className="text-xl">{icon}</span>}
      <span
        className={`capitalize font-haas ${isBest ? "text-feature text-navy" : "text-base"} tracking-wide`}
      >
        {activity}
      </span>
      <span className={`ml-auto font-mono ${getScoreColor(score)} text-lg`}>
        {score}/10
      </span>
      {isBest && (
        <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">
          {t("best")}
        </span>
      )}
      <span className="ml-4 text-caption text-text-weak">{reasoning}</span>
    </div>
  );
}
