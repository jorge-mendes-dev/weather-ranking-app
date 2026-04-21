"use client";

import type { City } from "@weather-app/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CityCardList } from "./components/CityCardList";
import { ForecastView } from "./components/ForecastView";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SearchBar } from "./components/SearchBar";
import { fetchRankings, searchCities } from "./services/api";
import {
  processForecast,
  type ProcessedForecast,
} from "./utils/processForecast";

type AppState =
  | "IDLE"
  | "SEARCHING"
  | "CITY_SELECTED"
  | "LOADING_FORECAST"
  | "READY"
  | "ERROR";

export default function HomeClient() {
  const { t } = useTranslation();
  const [appState, setAppState] = useState<AppState>("IDLE");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [forecast, setForecast] = useState<ProcessedForecast | null>(null);
  const [forecastError, setForecastError] = useState<string | null>(null);
  // For staggered animation
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Helper: is idle (no results, no forecast)
  const isIdle =
    appState === "IDLE" && !searchResults.length && !selectedCity && !forecast;

  // Search handler
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

  // City select handler
  async function handleSelectCity(city: City) {
    setSelectedCity(city);
    setAppState("CITY_SELECTED");
    setForecast(null);
    setForecastError(null);
    setSearchResults([]);
    setSearchLoading(false);
    setAppState("LOADING_FORECAST");
    try {
      // Fetch rankings API
      const rankings = await fetchRankings(city.latitude, city.longitude);
      // Group rankings by day and map to DayForecast[]
      const grouped: Record<
        string,
        import("./utils/processForecast").Activity[]
      > = {};
      for (const r of rankings) {
        if (!grouped[r.day]) grouped[r.day] = [];
        grouped[r.day].push({
          type: r.activity.toUpperCase() as any, // assumes activity matches Activity type
          score: r.score,
          reasoning: `Temp: ${r.conditions.temperature}°C, Wind: ${r.conditions.windSpeed}km/h, Precip: ${r.conditions.precipitation}mm, UV: ${r.conditions.uvIndex}`,
        });
      }
      const dayForecasts: import("./utils/processForecast").DayForecast[] =
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

  // UI rendering by state
  return (
    <div
      className={`flex flex-col items-center w-full mx-auto min-h-[60vh] ${isIdle ? "grow justify-center" : "pt-8"}`}
      style={isIdle ? { minHeight: "60vh" } : {}}
    >
      {/* Hero Section */}
      <section
        className={`w-full flex flex-col items-center justify-center text-center gap-3 ${isIdle ? "mb-4" : "mt-0 mb-4"} transition-opacity duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-1">
          {t("common:hero_title", "Find the best activities based on weather")}
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-2 max-w-xl mx-auto">
          {t(
            "common:hero_subtitle",
            "Search a city to get a 7-day activity ranking",
          )}
        </p>
      </section>
      {/* Search Bar always visible */}
      <div
        className={`w-full max-w-4xl mx-auto mb-6 flex justify-center transition-opacity duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${isIdle ? "" : "mt-0"}`}
      >
        <SearchBar
          placeholder={t(
            "common:search_city_placeholder",
            "Start typing a city to search",
          )}
          onSearch={handleSearch}
        />
      </div>
      {/* Empty state */}
      {appState === "IDLE" && (
        <div className="w-full max-w-4xl mx-auto text-center text-gray-400 text-base mt-8 animate-fade-in">
          {t("common:empty_state", "Start typing a city to search")}
        </div>
      )}
      {/* State: SEARCHING - show city results */}
      {appState === "SEARCHING" && (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
          {searchLoading && <LoadingSpinner />}
          {searchError && (
            <div className="text-error mb-2 text-center">{searchError}</div>
          )}
          <CityCardList
            cities={searchResults}
            onSelect={handleSelectCity}
            loading={searchLoading}
          />
        </div>
      )}
      {/* State: LOADING_FORECAST */}
      {appState === "LOADING_FORECAST" && <LoadingSpinner />}
      {/* State: READY - show forecast */}
      {appState === "READY" && forecast && (
        <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
          <ForecastView
            forecast={forecast}
            cityName={selectedCity?.name || ""}
          />
        </div>
      )}
      {/* State: ERROR */}
      {appState === "ERROR" && (
        <div className="text-error mt-6 animate-fade-in text-center">
          {searchError ||
            forecastError ||
            t("common:error", "Something went wrong")}
        </div>
      )}
    </div>
  );
}
