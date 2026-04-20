"use client";

import type { City } from "@weather-app/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CityCardList } from "./components/CityCardList";
import { ForecastView } from "./components/ForecastView";
import { SearchBar } from "./components/SearchBar";
import { fetchWeather7Day, searchCities } from "./services/api";
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
      // Fetch weather7Day API
      const weatherData = await fetchWeather7Day(city.latitude, city.longitude);
      // Map weather data to DayForecast[] with mock activities
      const dayForecasts: import("./utils/processForecast").DayForecast[] =
        weatherData.map((day: any) => {
          // Example scoring logic (replace with real logic as needed)
          const activities = [
            {
              type: "OUTDOOR" as const,
              score: Math.round(
                Math.max(0, 10 - Math.abs(day.temperature - 20)) +
                  (10 - day.precipitation * 10) +
                  (10 - Math.abs(day.uvIndex - 6)),
              ),
              reasoning: `Good for outdoor activities. Temp: ${day.temperature}°C, Precip: ${day.precipitation}mm, UV: ${day.uvIndex}`,
            },
            {
              type: "INDOOR" as const,
              score: Math.round(
                Math.max(0, 10 - Math.abs(day.temperature - 22)) +
                  (day.precipitation > 0 ? 10 : 0) +
                  (day.uvIndex > 7 ? 5 : 0),
              ),
              reasoning: `Better for indoor if rain or high UV. Temp: ${day.temperature}°C, Precip: ${day.precipitation}mm, UV: ${day.uvIndex}`,
            },
            {
              type: "SURFING" as const,
              score: Math.round(
                (day.windSpeed > 10 ? 8 : 4) +
                  (day.temperature > 18 ? 6 : 2) +
                  (day.precipitation === 0 ? 6 : 2),
              ),
              reasoning: `Surfing score based on wind and temp. Wind: ${day.windSpeed}km/h, Temp: ${day.temperature}°C`,
            },
            {
              type: "SKIING" as const,
              score: Math.round(
                (day.temperature < 5 ? 10 : 2) +
                  (day.precipitation > 0 ? 6 : 2) +
                  (day.windSpeed < 15 ? 6 : 2),
              ),
              reasoning: `Skiing score based on temp and snow. Temp: ${day.temperature}°C, Precip: ${day.precipitation}mm`,
            },
          ];
          return {
            date: day.day,
            activities,
          };
        });
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
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-16 justify-center">
      {/* Hero Section */}
      <section
        className={`w-full flex flex-col items-center justify-center text-center mb-10 transition-opacity duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-text drop-shadow-lg">
          {t("common:hero_title", "Find the Best Weather for Your Activities")}
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
          {t(
            "common:hero_subtitle",
            "Search any city and get a ranked forecast for outdoor, indoor, surfing, and skiing days.",
          )}
        </p>
      </section>
      {/* Search Bar always visible */}
      <div
        className={`w-full mb-8 transition-opacity duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <SearchBar
          placeholder={t(
            "common:search_city_placeholder",
            "Enter a city name...",
          )}
          onSearch={handleSearch}
        />
      </div>
      {/* State: SEARCHING - show city results */}
      {appState === "SEARCHING" && (
        <div className="w-full animate-fade-in">
          {searchLoading && (
            <div className="text-brand mb-2">
              {t("common:loading", "Loading...")}
            </div>
          )}
          {searchError && <div className="text-error mb-2">{searchError}</div>}
          <CityCardList
            cities={searchResults}
            onSelect={handleSelectCity}
            loading={searchLoading}
          />
        </div>
      )}
      {/* State: LOADING_FORECAST */}
      {appState === "LOADING_FORECAST" && (
        <div className="w-full flex justify-center items-center min-h-30 animate-fade-in">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand"></div>
        </div>
      )}
      {/* State: READY - show forecast */}
      {appState === "READY" && forecast && (
        <div className="w-full mt-8 animate-fade-in">
          <ForecastView forecast={forecast} />
        </div>
      )}
      {/* State: ERROR */}
      {appState === "ERROR" && (
        <div className="text-error mt-6 animate-fade-in">
          {searchError ||
            forecastError ||
            t("common:error", "Something went wrong")}
        </div>
      )}
    </div>
  );
}
