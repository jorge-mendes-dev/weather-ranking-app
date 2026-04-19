import type { ActivityRanking } from "@weather-app/types";

interface Props {
  ranking: ActivityRanking;
  index: number;
  emojiMap: Record<string, string>;
  scoreColor: (score: number) => string;
}

export function ActivityRankingItem({
  ranking,
  index,
  emojiMap,
  scoreColor,
}: Props) {
  return (
    <li className="flex items-center gap-5 bg-white border border-border rounded-card px-6 py-5 shadow-blue-tint">
      <span className="text-text-weak font-semibold min-w-6 text-lg">
        {index + 1}
      </span>
      <span className="text-2xl">{emojiMap[ranking.activity] ?? "🏅"}</span>
      <span className="flex-1 capitalize font-haas text-card-title font-medium tracking-wide">
        {ranking.activity}
      </span>
      <span
        className="font-bold text-lg min-w-12 text-right"
        style={{ color: scoreColor(ranking.score) }}
      >
        {ranking.score}
      </span>
      <span className="text-text-weak text-base">/100</span>
    </li>
  );
}
