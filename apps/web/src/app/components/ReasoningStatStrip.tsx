import React from "react";

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
        // Try to extract label and value
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
            icon = (
              <svg
                className="w-4 h-4 mr-1 text-orange-500"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2a2 2 0 0 1 2 2v7.17a3 3 0 1 1-4 0V4a2 2 0 0 1 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="10"
                  cy="15"
                  r="3"
                  fill="currentColor"
                  className="text-orange-200"
                />
              </svg>
            );
            color = "text-orange-600 bg-orange-50";
            break;
          case "wind":
            icon = (
              <svg
                className="w-4 h-4 mr-1 text-blue-400"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3 10h10a3 3 0 1 1 0 6H5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            );
            color = "text-blue-600 bg-blue-50";
            break;
          case "precip":
            icon = (
              <svg
                className="w-4 h-4 mr-1 text-cyan-500"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2v12m0 0c-2.5 0-4.5-2-4.5-4.5S7.5 5 10 5s4.5 2 4.5 4.5S12.5 14 10 14z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            );
            color = "text-cyan-700 bg-cyan-50";
            break;
          case "uv":
            icon = (
              <svg
                className="w-4 h-4 mr-1 text-yellow-500"
                fill="none"
                viewBox="0 0 20 20"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 2v2m0 12v2m8-8h-2M4 10H2m13.07-5.07l-1.42 1.42M6.34 17.66l-1.42-1.42m0-11.32l1.42 1.42m11.32 11.32l-1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            );
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
