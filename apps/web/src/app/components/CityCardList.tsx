"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { City } from "@weather-app/types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  if (!cities.length) return null;
  return (
    <div className="flex flex-col gap-4 w-full">
      {cities.map((city) => {
        const isSelected =
          selectedCity &&
          city.latitude === selectedCity.latitude &&
          city.longitude === selectedCity.longitude;
        return (
          <button
            key={`${city.name}-${city.latitude}-${city.longitude}`}
            className={`group w-full text-left bg-white border rounded-sm px-6 py-4 flex items-center justify-between shadow-card transition-all duration-200 cursor-pointer
              ${isSelected ? "border-green-600 bg-green-50 ring-2 ring-green-100 shadow-sm" : "border-gray-200 hover:shadow-lg hover:bg-gray-50 hover:border-green-400 focus:ring-2 focus:ring-green-200"}
              ${loading ? "opacity-60 pointer-events-none" : ""}`}
            onClick={() => onSelect(city)}
            disabled={loading}
            tabIndex={0}
            aria-label={t("city_card_list.aria_label", {
              name: city.name,
              country: city.country,
            })}
            style={{
              transitionProperty:
                "box-shadow, background, border-color, transform",
              transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200">
                {city.name}
              </span>
              <span className="text-sm text-gray-500 group-hover:text-green-500 transition-colors duration-200">
                {city.country}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {city.latitude}, {city.longitude}
              </span>
            </div>
            <span className="ml-4 flex items-center justify-center">
              <ArrowRightIcon
                className={`w-6 h-6 transition-transform duration-200 ${isSelected ? "text-green-600" : "text-gray-300 group-hover:text-green-400"} group-hover:translate-x-1`}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
