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

/**
 * Renders a list of city cards for selection.
 * @param {CityCardListProps} props - The props for the component.
 */
export function CityCardList({
  cities,
  onSelect,
  selectedCity,
  loading,
}: CityCardListProps) {
  const { t } = useTranslation();
  if (!cities.length) return null;
  return (
    <div className="flex flex-col gap-5 w-full">
      {cities.map((city) => {
        const isSelected =
          selectedCity &&
          city.latitude === selectedCity.latitude &&
          city.longitude === selectedCity.longitude;
        return (
          <button
            key={`${city.name}-${city.latitude}-${city.longitude}`}
            className={`group w-full text-left bg-white/95 border border-gray-300 rounded-xl px-7 py-5 flex items-center justify-between shadow-[0_2px_16px_0_rgba(27,97,201,0.07)] transition-all duration-300 cursor-pointer
              ${isSelected ? "border-green-600 bg-green-50/80 ring-2 ring-green-200 shadow-md" : "border-gray-300 hover:shadow-[0_8px_32px_0_rgba(27,97,201,0.13)] hover:bg-blue-50/30 hover:border-blue-400 focus:ring-2 focus:ring-blue-200"}
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
            <div className="flex flex-col items-start gap-1">
              <span className="text-lg font-bold text-color-text group-hover:text-blue-700 transition-colors duration-200 tracking-tight leading-tight drop-shadow-sm">
                {city.name}
              </span>
              <span className="text-sm text-blue-600/80 group-hover:text-blue-800 transition-colors duration-200 font-medium">
                {city.country}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                {city.latitude}, {city.longitude}
              </span>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-200 group-hover:text-blue-500 transition-colors duration-200" />
          </button>
        );
      })}
    </div>
  );
}
