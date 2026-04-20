import type { Ranking } from "@weather-app/types";
interface Props {
  ranking: Ranking;
  index: number;
  emojiMap: Record<string, string>;
  scoreColor: (score: number) => string;
}

/**
 * Renders a single activity ranking item in a list.
 * @param {Props} props - The props for the component.
 */
export function ActivityRankingItem({
  ranking,
  index,
  emojiMap,
  scoreColor,
}: Props) {
  const { t } = require("react-i18next");
  return (
    <li className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 font-display transition-all duration-200 hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 hover:scale-[1.01] focus:shadow-xl focus:border-blue-300">
      <span className="text-blue-600 font-semibold min-w-6 text-base">
        {index + 1}
      </span>
      <span className="text-xl">{emojiMap[ranking.activity] ?? "🏅"}</span>
      <span className="flex-1 capitalize text-base font-medium tracking-tight text-gray-800">
        {ranking.activity}
      </span>
      <span
        className="font-bold text-base min-w-10 text-right text-gray-700"
        style={{ color: scoreColor(ranking.score) }}
      >
        {ranking.score}
      </span>
      <span className="text-gray-400 text-xs">
        {t("activity_ranking_item.out_of", { value: 100 })}
      </span>
    </li>
  );
}
