"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "./icons/SearchIcon";

interface ActivityItemProps {
  activity: string;
  score: number;
  reasoning: string;
  isBest?: boolean;
  icon?: React.ReactNode;
}

// Map activity names to icons
const activityIcons: Record<string, React.ReactNode> = {
  search: <SearchIcon className="w-6 h-6 text-blue-400" />,
  // Add more mappings as needed, e.g.:
  // home: <HomeIcon className="w-6 h-6 text-green-400" />,
  // results: <ResultsIcon className="w-6 h-6 text-yellow-400" />,
};

/**
 * Renders an activity item with score, reasoning, and optional icon.
 * @param {ActivityItemProps} props - The props for the component.
 */
export function ActivityItem({
  activity,
  score,
  reasoning,
  isBest,
  icon,
}: ActivityItemProps) {
  const { t } = useTranslation();

  // Color logic using theme tokens
  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-blue-600 bg-blue-50"; // High
    if (score >= 4) return "text-yellow-700 bg-yellow-50"; // Medium
    return "text-gray-400 bg-gray-100"; // Low
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Only toggle if not clicking a child interactive element
    if ("key" in e ? e.key === "Enter" || e.key === " " : true) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div
      className={`group flex flex-col gap-0 px-0 py-0 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-400/60 outline-none cursor-pointer select-none ${expanded ? "bg-blue-50/30 ring-2 ring-blue-100" : ""}`}
      tabIndex={0}
      aria-label={activity}
      aria-expanded={expanded}
      onClick={handleToggle}
      onKeyDown={handleToggle}
      role="button"
    >
      <div className="flex items-center gap-4 px-5 py-3 w-full">
        {/* Activity icon (auto) */}
        <span className="text-xl mr-2" aria-hidden="true">
          {activityIcons[activity.toLowerCase()] || icon}
        </span>
        <span
          className={`capitalize font-display text-base tracking-wide text-navy-900 ${isBest ? "font-bold" : "font-medium"}`}
        >
          {activity}
        </span>
        <span
          className={`ml-auto font-mono text-xs px-2 py-0.5 rounded-full border border-gray-200 ${getScoreColor(score)} transition-colors font-semibold shadow-sm`}
          aria-label={t("score_label", { score })}
        >
          {score}/10
        </span>
        {isBest && (
          <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold animate-pulse border border-blue-200 shadow-sm">
            {t("best")}
          </span>
        )}
        {/* Expand/collapse icon */}
        <span
          className={`ml-3 transition-transform duration-300 text-gray-400 group-hover:text-blue-500 ${expanded ? "rotate-90" : "rotate-0"}`}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 8l3 3 3-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 px-5 ${expanded ? "max-h-40 py-2" : "max-h-0 py-0"}`}
        aria-hidden={!expanded}
      >
        {reasoning && (
          <div className="text-xs text-gray-700 font-body whitespace-pre-line">
            {reasoning}
          </div>
        )}
        {/* Add more details here if needed */}
      </div>
    </div>
  );
}
