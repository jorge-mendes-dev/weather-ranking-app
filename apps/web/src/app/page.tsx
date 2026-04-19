import type { ActivityRanking } from "@weather-app/types";
import HomeClientShell from "./HomeClientShell";
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
    <HomeClientShell
      rankings={rankings}
      conditions={conditions}
      fetchError={fetchError}
      defaultLat={DEFAULT_LAT}
      defaultLon={DEFAULT_LON}
    />
  );
}
