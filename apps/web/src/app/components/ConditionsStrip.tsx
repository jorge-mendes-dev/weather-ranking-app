import type { WeatherCondition } from "@weather-app/types";
import { useTranslation } from "react-i18next";
import { Stat } from "./Stat";

interface Props {
  conditions: WeatherCondition;
}

export function ConditionsStrip({ conditions }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-8 bg-light-surface border border-border rounded-section px-8 py-5 mb-10 shadow-soft">
      <Stat label={t("temp")} value={`${conditions.temperature} °C`} />
      <Stat label={t("wind")} value={`${conditions.windSpeed} km/h`} />
      <Stat label={t("rain")} value={`${conditions.precipitation} mm`} />
      <Stat label={t("uv")} value={String(conditions.uvIndex)} />
    </div>
  );
}
