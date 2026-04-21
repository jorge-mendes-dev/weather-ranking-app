"use client";
import { useTranslation } from "react-i18next";
import { CityCardList } from "../components/CityCardList";
import { ForecastView } from "../components/ForecastView";
import { GoToTopButton } from "../components/GoToTopButton";
import { HeroSection } from "../components/HeroSection";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SearchBar } from "../components/SearchBar";

interface HomeContentProps {
  appState: string;
  isIdle: boolean;
  mounted: boolean;
  searchResults: any[];
  searchError: string | null;
  searchLoading: boolean;
  selectedCity: any;
  forecast: any;
  forecastError: string | null;
  handleSearch: (query: string) => void;
  handleSelectCity: (city: any) => void;
}

export function HomeContent({
  appState,
  isIdle,
  mounted,
  searchResults,
  searchError,
  searchLoading,
  selectedCity,
  forecast,
  forecastError,
  handleSearch,
  handleSelectCity,
}: HomeContentProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col items-center w-full mx-auto min-h-[60vh] ${isIdle ? "grow justify-center" : "pt-8"}`}
      style={isIdle ? { minHeight: "60vh" } : {}}
    >
      <HeroSection isIdle={isIdle} mounted={mounted} />
      <div
        className={`w-full max-w-4xl mx-auto mb-6 flex justify-center transition-opacity duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${isIdle ? "" : "mt-0"}`}
      >
        <SearchBar
          placeholder={t(
            "common:search_city_placeholder",
            "Start typing a city to search",
          )}
          onSearch={handleSearch}
          onClear={() => handleSearch("")}
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
        <div className="w-full max-w-4xl mx-auto animate-fade-in relative">
          {searchLoading && <LoadingSpinner />}
          {searchError && (
            <div className="text-error mb-2 text-center">{searchError}</div>
          )}
          <CityCardList
            cities={searchResults}
            onSelect={handleSelectCity}
            loading={searchLoading}
          />
          <GoToTopButton />
        </div>
      )}
      {/* State: LOADING_FORECAST */}
      {appState === "LOADING_FORECAST" && <LoadingSpinner />}
      {/* State: READY - show forecast */}
      {appState === "READY" && forecast && (
        <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in relative">
          <ForecastView
            forecast={forecast}
            cityName={selectedCity?.name || ""}
          />
          <GoToTopButton />
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
