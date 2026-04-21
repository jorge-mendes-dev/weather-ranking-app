import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/formatDate";

interface BestDayProps {
  date: string;
  activity: string;
  score: number;
}

/**
 * Displays the best day of the week for a given activity and score.
 * @param {BestDayProps} props - The props for the component.
 */
export function BestDay({ date, activity, score }: BestDayProps) {
  const { t } = useTranslation();
  const formattedDate = formatDate(date);

  return (
    <div className="bg-white/95 border border-gray-300 rounded-2xl p-6 font-display flex flex-col gap-3 emil-shadow-card emil-shadow-card-hover emil-spring emil-fadein mb-6">
      <div className="text-base font-bold text-color-text mb-1 flex items-center gap-2 drop-shadow-sm">
        <CalendarDaysIcon
          className="h-5 w-5 text-blue-400 mr-1 opacity-80"
          aria-hidden="true"
        />
        {t("best_day_this_week")}
      </div>
      <div className="flex justify-center items-center gap-3">
        <span className="font-bold text-blue-700 mr-2 tracking-tight leading-tight">
          {formattedDate}
        </span>
        <span className="capitalize font-semibold text-gray-800">
          {activity}
        </span>
        <span className="ml-2 text-blue-700 font-mono bg-blue-50/60 rounded px-2 py-0.5 text-xs shadow-sm">
          {score}/10
        </span>
      </div>
    </div>
  );
}
