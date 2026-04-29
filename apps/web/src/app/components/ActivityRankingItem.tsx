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
import { useTranslation } from "react-i18next";

export function ActivityRankingItem({
  ranking,
  index,
  emojiMap,
  scoreColor,
}: Props) {
  const { t } = useTranslation();
  return (
    <li className="flex items-center gap-5 bg-white/95 border border-border rounded-xl p-5 font-display emil-shadow-card emil-shadow-card-hover emil-spring emil-fadein">
      <span className="text-blue-600 font-bold min-w-7 text-lg drop-shadow-sm">
        {index + 1}
      </span>
      <span className="text-2xl">{emojiMap[ranking.activity] ?? "🏅"}</span>
      <span className="flex-1 capitalize text-base font-semibold tracking-tight text-color-text">
        {ranking.activity}
      </span>
      <span
        className="font-bold min-w-10 text-right text-blue-700 bg-blue-50/60 rounded px-2 py-0.5 shadow-sm"
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
