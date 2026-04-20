import type { ActivityRanking } from "@weather-app/types";
import { ActivityRankingItem } from "./ActivityRankingItem";

interface Props {
  rankings: ActivityRanking[];
  emojiMap: Record<string, string>;
  scoreColor: (score: number) => string;
}

/**
 * Renders a list of activity rankings.
 * @param {Props} props - The props for the component.
 */
export function ActivityRankingList({ rankings, emojiMap, scoreColor }: Props) {
  return (
    <ol className="flex flex-col gap-3 list-none p-0 m-0 transition-all duration-200">
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
