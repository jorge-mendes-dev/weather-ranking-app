import { gqlClient } from "@/lib/graphql-client";
import type { ActivityRanking } from "@weather-app/types";

const RANKINGS_QUERY = `
  query Rankings($latitude: Float!, $longitude: Float!) {
    rankings(latitude: $latitude, longitude: $longitude) {
      activity
      score
      conditions {
        temperature
        windSpeed
        precipitation
        uvIndex
      }
    }
  }
`;

// Default location: Paris, France
const DEFAULT_LAT = 48.8566;
const DEFAULT_LON = 2.3522;

interface RankingsResponse {
  rankings: ActivityRanking[];
}

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
    const data = await gqlClient.request<RankingsResponse>(RANKINGS_QUERY, {
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LON,
    });
    rankings = data.rankings;
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
        <div className="text-red-600 font-medium mt-8">
          Unable to fetch rankings data. Please ensure the API is running.
          <br />
          <span className="text-xs text-text-weak">
            (This page requires the backend API to be available at build time.)
          </span>
        </div>
      ) : (
        <>
          {/* Current conditions strip */}
          <div className="flex flex-wrap gap-6 bg-light-surface border border-border rounded-md px-6 py-4 mb-8">
            <Stat label="Temp" value={`${conditions.temperature} °C`} />
            <Stat label="Wind" value={`${conditions.windSpeed} km/h`} />
            <Stat label="Rain" value={`${conditions.precipitation} mm`} />
            <Stat label="UV" value={String(conditions.uvIndex)} />
          </div>
          {/* Rankings list */}
          <ol className="flex flex-col gap-3 list-none p-0 m-0">
            {rankings.map((r, i) => (
              <li
                key={r.activity}
                className="flex items-center gap-4 bg-white border border-border rounded-md px-5 py-4 shadow-blue-tint"
              >
                <span className="text-gray-400 font-semibold min-w-[1.5rem]">
                  {i + 1}
                </span>
                <span className="text-2xl">
                  {ACTIVITY_EMOJI[r.activity] ?? "🏅"}
                </span>
                <span className="flex-1 capitalize font-medium text-base">
                  {r.activity}
                </span>
                <span
                  className="font-bold text-lg min-w-[3rem] text-right"
                  style={{ color: SCORE_COLOR(r.score) }}
                >
                  {r.score}
                </span>
                <span className="text-gray-400 text-sm">/100</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-text-weak uppercase tracking-wide">
        {label}
      </div>
      <div className="font-semibold text-base">{value}</div>
    </div>
  );
}
