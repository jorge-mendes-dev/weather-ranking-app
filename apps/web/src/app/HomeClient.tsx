"use client";
import { HomeContent } from "./containers/HomeContent";
import { useHomeClientState } from "./hooks/useHomeClientState";

export default function HomeClient() {
  const {
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
  } = useHomeClientState();

  return (
    <>
      <HomeContent
        appState={appState}
        isIdle={isIdle}
        mounted={mounted}
        searchResults={searchResults}
        searchError={searchError}
        searchLoading={searchLoading}
        selectedCity={selectedCity}
        forecast={forecast}
        forecastError={forecastError}
        handleSearch={handleSearch}
        handleSelectCity={handleSelectCity}
      />
    </>
  );
}
