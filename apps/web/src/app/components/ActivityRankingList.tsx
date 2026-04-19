import type { ActivityRanking } from "@weather-app/types";
import { ActivityRankingItem } from "./ActivityRankingItem";

interface Props {
  rankings: ActivityRanking[];
  emojiMap: Record<string, string>;
  scoreColor: (score: number) => string;
}

export function ActivityRankingList({ rankings, emojiMap, scoreColor }: Props) {
  return (
    <ol className="flex flex-col gap-4 list-none p-0 m-0">
      {rankings.map((r, i) => (
        <ActivityRankingItem
          key={r.activity}
          ranking={r}
          index={i}
          emojiMap={emojiMap}
          scoreColor={scoreColor}
        />
      ))}
    </ol>
  );
}
