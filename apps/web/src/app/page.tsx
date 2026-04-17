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
  const data = await gqlClient.request<RankingsResponse>(RANKINGS_QUERY, {
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LON,
  });

  const { rankings } = data;
  const { conditions } = rankings[0];

  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "720px",
        margin: "0 auto",
        padding: "2rem 1rem",
        color: "#181d26",
      }}
    >
      <h1
        style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.25rem" }}
      >
        Weather Activity Rankings
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Paris, France — {DEFAULT_LAT}°N, {DEFAULT_LON}°E
      </p>

      {/* Current conditions strip */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          background: "#f8fafc",
          border: "1px solid #e0e2e6",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Stat label="Temp" value={`${conditions.temperature} °C`} />
        <Stat label="Wind" value={`${conditions.windSpeed} km/h`} />
        <Stat label="Rain" value={`${conditions.precipitation} mm`} />
        <Stat label="UV" value={String(conditions.uvIndex)} />
      </div>

      {/* Rankings list */}
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {rankings.map((r, i) => (
          <li
            key={r.activity}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "#ffffff",
              border: "1px solid #e0e2e6",
              borderRadius: "12px",
              padding: "1rem 1.25rem",
              boxShadow: "0 1px 3px rgba(45,127,249,0.08)",
            }}
          >
            <span
              style={{ color: "#9ca3af", fontWeight: 600, minWidth: "1.5rem" }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: "1.5rem" }}>
              {ACTIVITY_EMOJI[r.activity] ?? "🏅"}
            </span>
            <span
              style={{
                flex: 1,
                textTransform: "capitalize",
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              {r.activity}
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: SCORE_COLOR(r.score),
                minWidth: "3rem",
                textAlign: "right",
              }}
            >
              {r.score}
            </span>
            <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>/100</span>
          </li>
        ))}
      </ol>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 600, fontSize: "1rem" }}>{value}</div>
    </div>
  );
}
