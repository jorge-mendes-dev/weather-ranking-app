import React from "react";
import { PrecipIcon } from "./icons/PrecipIcon";
import { TempIcon } from "./icons/TempIcon";
import { UvIcon } from "./icons/UvIcon";
import { WindIcon } from "./icons/WindIcon";

interface ReasoningStatStripProps {
  reasoning: string;
}

/**
 * Renders a visually distinct, card-like stat strip for weather reasoning.
 * Accepts a comma-separated string like:
 *   "Temp: 24.95°C, Wind: 9.1km/h, Precip: 0mm, UV: 6.8"
 */
export function ReasoningStatStrip({ reasoning }: ReasoningStatStripProps) {
  if (!reasoning) return null;
  return (
    <div className="flex flex-wrap gap-3 items-center py-1 px-0 text-xs font-mono text-navy-900">
      {reasoning.split(/,\s*/).map((stat, idx) => {
        const match = stat.match(/([A-Za-z]+):\s*([\d.]+)([^,]*)/);
        if (!match)
          return (
            <span
              key={idx}
              className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-body"
            >
              {stat}
            </span>
          );
        const [_, label, value, unit] = match;
        let icon: React.ReactNode = null;
        let color = "";
        switch (label.toLowerCase()) {
          case "temp":
            icon = <TempIcon className="w-4 h-4 mr-1 text-orange-500" />;
            color = "text-orange-600 bg-orange-50";
            break;
          case "wind":
            icon = <WindIcon className="w-4 h-4 mr-1 text-blue-400" />;
            color = "text-blue-600 bg-blue-50";
            break;
          case "precip":
            icon = <PrecipIcon className="w-4 h-4 mr-1 text-cyan-500" />;
            color = "text-cyan-700 bg-cyan-50";
            break;
          case "uv":
            icon = <UvIcon className="w-4 h-4 mr-1 text-yellow-500" />;
            color = "text-yellow-700 bg-yellow-50";
            break;
          default:
            color = "text-gray-700 bg-gray-100";
        }
        return (
          <span
            key={idx}
            className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold shadow-sm ${color}`}
            style={{ minWidth: 0 }}
          >
            {icon}
            <span className="font-mono tabular-nums">
              {value}
              {unit}
            </span>
            <span className="ml-1 font-body text-gray-500">{label}</span>
          </span>
        );
      })}
    </div>
  );
}
