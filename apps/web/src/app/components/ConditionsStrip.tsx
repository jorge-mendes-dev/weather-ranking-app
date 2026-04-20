"use client";
import type { WeatherCondition } from "@weather-app/types";
import { useTranslation } from "react-i18next";
import { Stat } from "./Stat";

interface Props {
  conditions: WeatherCondition;
}

/**
 * Displays a strip of weather conditions as stats.
 * @param {Props} props - The props for the component.
 */
export function ConditionsStrip({ conditions }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-8 bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 mb-8 font-display transition hover:shadow-md hover:bg-gray-50">
      <Stat label={t("temp")} value={`${conditions.temperature} °C`} />
      <Stat label={t("wind")} value={`${conditions.windSpeed} km/h`} />
      <Stat label={t("rain")} value={`${conditions.precipitation} mm`} />
      <Stat label={t("uv")} value={String(conditions.uvIndex)} />
    </div>
  );
}
