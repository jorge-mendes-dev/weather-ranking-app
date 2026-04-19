import type { ActivityRanking } from "@weather-app/types";
import { ErrorMessage } from "./components/ErrorMessage";
import HomeClient from "./HomeClient";
import { fetchRankings } from "./services/api";

// Default location: Paris, France
const DEFAULT_LAT = 48.8566;
const DEFAULT_LON = 2.3522;

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
        <HomeClient rankings={rankings} conditions={conditions} />
      )}
    </main>
  );
}
