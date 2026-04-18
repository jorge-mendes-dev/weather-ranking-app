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

export interface RankingsResponse {
  rankings: ActivityRanking[];
}

export async function fetchRankings(latitude: number, longitude: number): Promise<ActivityRanking[]> {
  const data = await gqlClient.request<RankingsResponse>(RANKINGS_QUERY, { latitude, longitude });
  return data.rankings;
}
