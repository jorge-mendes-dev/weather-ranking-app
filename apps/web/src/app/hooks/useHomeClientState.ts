import type { City } from "@weather-app/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchRankings, searchCities } from "../services/api";
import { processForecast, type ProcessedForecast } from "../utils/processForecast";

type AppState =
  | "IDLE"
  | "SEARCHING"
  | "CITY_SELECTED"
  | "LOADING_FORECAST"
  | "READY"
  | "ERROR";

export function useHomeClientState() {
  const { t } = useTranslation();
  const [appState, setAppState] = useState<AppState>("IDLE");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [forecast, setForecast] = useState<ProcessedForecast | null>(null);
  const [forecastError, setForecastError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isIdle =
    appState === "IDLE" && !searchResults.length && !selectedCity && !forecast;

  async function handleSearch(query: string) {
    if (!query) {
      setAppState("IDLE");
      setSearchResults([]);
      setSearchError(null);
      setSelectedCity(null);
      setForecast(null);
      setForecastError(null);
      return;
    }
    setAppState("SEARCHING");
    setSearchLoading(true);
    setSearchError(null);
    setSearchResults([]);
    setSelectedCity(null);
    setForecast(null);
    try {
      const results = await searchCities(query);
      setSearchResults(results);
      setAppState("SEARCHING");
    } catch (e) {
      setSearchError(t("common:search_error") || "Error searching cities");
      setAppState("ERROR");
    } finally {
      setSearchLoading(false);
    }
  }

  async function handleSelectCity(city: City) {
    setSelectedCity(city);
    setAppState("CITY_SELECTED");
    setForecast(null);
    setForecastError(null);
    setSearchResults([]);
    setSearchLoading(false);
    setAppState("LOADING_FORECAST");
    try {
      const rankings = await fetchRankings(city.latitude, city.longitude);
      const grouped: Record<string, import("../utils/processForecast").Activity[]> = {};
      for (const r of rankings) {
        if (!grouped[r.day]) grouped[r.day] = [];
        grouped[r.day].push({
          type: r.activity.toUpperCase() as any,
          score: r.score,
          reasoning: `Temp: ${r.conditions.temperature}°C, Wind: ${r.conditions.windSpeed}km/h, Precip: ${r.conditions.precipitation}mm, UV: ${r.conditions.uvIndex}`,
        });
      }
      const dayForecasts: import("../utils/processForecast").DayForecast[] =
        Object.entries(grouped).map(([date, activities]) => ({
          date,
          activities,
        }));
      const processed = processForecast(dayForecasts);
      setForecast(processed);
      setAppState("READY");
    } catch (e) {
      setForecastError(t("common:forecast_error") || "Error fetching forecast");
      setAppState("ERROR");
    }
  }

  return {
    appState,
    setAppState,
    searchResults,
    setSearchResults,
    searchError,
    setSearchError,
    searchLoading,
    setSearchLoading,
    selectedCity,
    setSelectedCity,
    forecast,
    setForecast,
    forecastError,
    setForecastError,
    mounted,
    isIdle,
    handleSearch,
    handleSelectCity,
  };
}
