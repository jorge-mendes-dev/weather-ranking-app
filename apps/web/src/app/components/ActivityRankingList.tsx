import type { Ranking } from "@weather-app/types";
import { ActivityRankingItem } from "./ActivityRankingItem";

interface Props {
  rankings: Ranking[];
  emojiMap: Record<string, string>;
  scoreColor: (score: number) => string;
}

/**
 * Renders a list of activity rankings.
 * @param {Props} props - The props for the component.
 */
export function ActivityRankingList({ rankings, emojiMap, scoreColor }: Props) {
  return (
    <ol className="flex flex-col gap-4 list-none p-0 m-0 transition-all duration-300">
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
