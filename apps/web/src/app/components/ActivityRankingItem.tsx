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
    <li className="flex items-center gap-4 bg-white border border-border rounded-md px-5 py-4 shadow-blue-tint">
      <span className="text-gray-400 font-semibold min-w-6">{index + 1}</span>
      <span className="text-2xl">{emojiMap[ranking.activity] ?? "🏅"}</span>
      <span className="flex-1 capitalize font-medium text-base">
        {ranking.activity}
      </span>
      <span
        className="font-bold text-lg min-w-12 text-right"
        style={{ color: scoreColor(ranking.score) }}
      >
        {ranking.score}
      </span>
      <span className="text-gray-400 text-sm">/100</span>
    </li>
  );
}
