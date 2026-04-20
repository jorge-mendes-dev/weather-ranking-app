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
    if (score >= 70) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-gray-400";
  };

  return (
    <div
      className={`flex items-center gap-3 font-display transition-all duration-200 hover:shadow-md hover:bg-gray-50 hover:-translate-y-0.5 hover:scale-[1.01] focus:shadow-lg focus:border-blue-200`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span
        className={`capitalize text-base tracking-tight text-gray-800 ${isBest ? "font-semibold" : ""}`}
      >
        {activity}
      </span>
      <span
        className={`ml-auto font-mono text-xs px-2 py-0.5 rounded bg-gray-100 ${getScoreColor(score)} transition-colors`}
      >
        {score}/10
      </span>
      {isBest && (
        <span className="ml-2 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold animate-pulse">
          {t("best")}
        </span>
      )}
      {reasoning && (
        <span className="ml-3 text-xs text-gray-400 truncate max-w-xs">
          {reasoning}
        </span>
      )}
    </div>
  );
}
