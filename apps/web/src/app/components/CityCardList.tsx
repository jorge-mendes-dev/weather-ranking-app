import type { City } from "@weather-app/types";

interface CityCardListProps {
  cities: City[];
  onSelect: (city: City) => void;
  selectedCity?: City | null;
  loading?: boolean;
}

export function CityCardList({
  cities,
  onSelect,
  selectedCity,
  loading,
}: CityCardListProps) {
  if (!cities.length) return null;
  return (
    <div className="flex flex-col gap-5 w-full">
      {cities.map((city) => (
        <button
          key={`${city.name}-${city.latitude}-${city.longitude}`}
          className={`w-full text-left bg-white border border-border rounded-card px-7 py-5 shadow-card outline-none transition-all duration-150
            ${selectedCity && city.latitude === selectedCity.latitude && city.longitude === selectedCity.longitude ? "border-brand ring-2 ring-brand" : "hover:border-brand hover:shadow-md focus:ring-2 focus:ring-brand"}
            ${loading ? "opacity-60 pointer-events-none" : ""}`}
          onClick={() => onSelect(city)}
          disabled={loading}
        >
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-text">{city.name}</span>
            <span className="text-sm text-gray-500">{city.country}</span>
            <span className="text-xs text-gray-400">
              {city.latitude}, {city.longitude}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
