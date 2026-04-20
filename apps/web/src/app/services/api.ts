import { gqlClient } from "@/lib/graphql-client";
import type { City, Ranking, Weather7Day } from "@weather-app/types";

/**
 * GraphQL query for fetching activity rankings by latitude and longitude.
 */
const RANKINGS_QUERY = `
  query Rankings($latitude: Float!, $longitude: Float!) {
    rankings(latitude: $latitude, longitude: $longitude) {
      day
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

/**
 * Fetch activity rankings for a given location.
 * @param latitude Latitude of the location
 * @param longitude Longitude of the location
 * @returns Array of Ranking objects
 */
export async function fetchRankings(latitude: number, longitude: number): Promise<Ranking[]> {
  const data = await gqlClient.request<{ rankings: Ranking[] }>(RANKINGS_QUERY, { latitude, longitude });
  return data.rankings;
}

/**
 * GraphQL query for searching cities by name.
 */
const SEARCH_CITIES_QUERY = `
  query SearchCities($name: String!) {
    searchCities(name: $name) {
      name
      country
      latitude
      longitude
    }
  }
`;

/**
 * Fetch cities matching a given name.
 * @param name Name of the city to search for
 * @returns Array of City objects
 */
export async function searchCities(name: string): Promise<City[]> {
  const data = await gqlClient.request<{ searchCities: City[] }>(SEARCH_CITIES_QUERY, { name });
  return data.searchCities;
}

/**
 * GraphQL query for fetching 7-day weather forecast by coordinates.
 */
const WEATHER_7DAY_QUERY = `
  query Weather7Day($latitude: Float!, $longitude: Float!) {
    weather7Day(latitude: $latitude, longitude: $longitude) {
      day
      temperature
      windSpeed
      precipitation
      uvIndex
    }
  }
`;

/**
 * Fetch 7-day weather forecast for a given location.
 * @param latitude Latitude of the location
 * @param longitude Longitude of the location
 * @returns Array of Weather7Day objects
 */
export async function fetchWeather7Day(latitude: number, longitude: number): Promise<Weather7Day[]> {
  const data = await gqlClient.request<{ weather7Day: Weather7Day[] }>(WEATHER_7DAY_QUERY, { latitude, longitude });
  return data.weather7Day;
}
