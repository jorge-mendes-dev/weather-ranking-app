import type { WeatherCondition } from "@weather-app/types";
import { Stat } from "./Stat";

interface Props {
  conditions: WeatherCondition;
}

export function ConditionsStrip({ conditions }: Props) {
  return (
    <div className="flex flex-wrap gap-6 bg-light-surface border border-border rounded-md px-6 py-4 mb-8">
      <Stat label="Temp" value={`${conditions.temperature} °C`} />
      <Stat label="Wind" value={`${conditions.windSpeed} km/h`} />
      <Stat label="Rain" value={`${conditions.precipitation} mm`} />
      <Stat label="UV" value={String(conditions.uvIndex)} />
    </div>
  );
}
