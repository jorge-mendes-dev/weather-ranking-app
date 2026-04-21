"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { City } from "@weather-app/types";
import { useTranslation } from "react-i18next";

/**
 * Props for CityCardList component.
 */
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
import React from "react";

/**
 * Renders a list of city cards for selection.
 * @param props - The props for the component.
 */
const CityCardListComponent = ({
  cities,
  onSelect,
  selectedCity,
  loading,
}: CityCardListProps) => {
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
            className={`group w-full text-left bg-white/95 border border-gray-300 rounded-xl px-7 py-5 flex items-center justify-between emil-shadow-card emil-shadow-card-hover emil-spring emil-fadein cursor-pointer
                   ${isSelected ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-200 shadow-md" : "border-gray-300"}
                   ${loading ? "opacity-60 pointer-events-none" : ""}
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 hover:scale-[1.01] active:scale-[0.98]`}
            onClick={() => onSelect(city)}
            disabled={loading}
            tabIndex={0}
            aria-label={t("city_card_list.aria_label", {
              name: city.name,
              country: city.country,
            })}
            aria-pressed={isSelected ? true : false}
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
};

export const CityCardList = React.memo(CityCardListComponent);
