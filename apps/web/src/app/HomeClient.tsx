"use client";
import type { ActivityRanking } from "@weather-app/types";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityRankingList } from "./components/ActivityRankingList";
import { ConditionsStrip } from "./components/ConditionsStrip";
import { SearchBar } from "./components/SearchBar";
import { SearchIcon } from "./components/icons/SearchIcon";

const SCORE_COLOR = (score: number): string => {
  if (score >= 70) return "#16a34a";
  if (score >= 40) return "#ca8a04";
  return "#dc2626";
};

const ACTIVITY_EMOJI: Record<string, string> = {
  surfing: "🏄",
  skiing: "⛷️",
  hiking: "🥾",
  cycling: "🚴",
  running: "🏃",
};

interface HomeClientProps {
  rankings: ActivityRanking[];
  conditions: ActivityRanking["conditions"];
}

export default function HomeClient({ rankings, conditions }: HomeClientProps) {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    if (!query) return rankings;
    return rankings.filter((r) =>
      r.activity.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, rankings]);

  return (
    <>
      <div className="mb-8">
        <SearchBar
          placeholder={t("search_placeholder")}
          icon={<SearchIcon className="w-5 h-5 text-text-weak" />}
          onSearch={setQuery}
        />
      </div>
      <ConditionsStrip conditions={conditions} />
      <ActivityRankingList
        rankings={filtered}
        emojiMap={ACTIVITY_EMOJI}
        scoreColor={SCORE_COLOR}
      />
    </>
  );
}
