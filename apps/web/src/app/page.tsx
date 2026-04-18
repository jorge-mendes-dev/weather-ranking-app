import type { ActivityRanking } from "@weather-app/types";
import { ActivityRankingList } from "./components/ActivityRankingList";
import { ConditionsStrip } from "./components/ConditionsStrip";
import { ErrorMessage } from "./components/ErrorMessage";
import { fetchRankings } from "./services/api";

// Default location: Paris, France
const DEFAULT_LAT = 48.8566;
const DEFAULT_LON = 2.3522;

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

export default async function Home() {
  let rankings: ActivityRanking[] | null = null;
  let conditions: ActivityRanking["conditions"] | null = null;
  let fetchError = false;

  try {
    rankings = await fetchRankings(DEFAULT_LAT, DEFAULT_LON);
    conditions = rankings[0]?.conditions ?? null;
  } catch (e) {
    fetchError = true;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 text-navy font-haas">
      <h1 className="text-section-heading font-haas mb-1 font-normal tracking-wide">
        Weather Activity Rankings
      </h1>
      <p className="text-text-weak mb-8">
        Paris, France — {DEFAULT_LAT}°N, {DEFAULT_LON}°E
      </p>
      {fetchError || !rankings || !conditions ? (
        <ErrorMessage>
          Unable to fetch rankings data. Please ensure the API is running.
        </ErrorMessage>
      ) : (
        <>
          {/* Current conditions strip */}
          <ConditionsStrip conditions={conditions} />

          {/* Rankings list */}
          <ActivityRankingList
            rankings={rankings}
            emojiMap={ACTIVITY_EMOJI}
            scoreColor={SCORE_COLOR}
          />
        </>
      )}
    </main>
  );
}
