import { gqlClient } from "@/lib/graphql-client";
import type { City, Weather7Day } from "@weather-app/types";

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

export async function searchCities(name: string): Promise<City[]> {
  const data = await gqlClient.request<{ searchCities: City[] }>(SEARCH_CITIES_QUERY, { name });
  return data.searchCities;
}

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

export async function fetchWeather7Day(latitude: number, longitude: number): Promise<Weather7Day[]> {
  const data = await gqlClient.request<{ weather7Day: Weather7Day[] }>(WEATHER_7DAY_QUERY, { latitude, longitude });
  return data.weather7Day;
}
