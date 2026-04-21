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
    <div className="flex flex-wrap gap-10 bg-blue-50/40 border border-border rounded-2xl px-8 py-5 mb-10 font-display emil-shadow-card emil-shadow-card-hover emil-spring emil-fadein">
      <Stat label={t("temp")} value={`${conditions.temperature} °C`} />
      <Stat label={t("wind")} value={`${conditions.windSpeed} km/h`} />
      <Stat label={t("rain")} value={`${conditions.precipitation} mm`} />
      <Stat label={t("uv")} value={String(conditions.uvIndex)} />
    </div>
  );
}
