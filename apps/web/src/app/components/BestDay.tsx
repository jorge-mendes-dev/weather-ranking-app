import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

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
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 font-display flex flex-col gap-2 transition-all duration-200 hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 hover:scale-[1.02] focus:shadow-xl focus:border-blue-300 mb-4">
      <div className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
        <CalendarDaysIcon
          className="h-5 w-5 text-blue-400 mr-1"
          aria-hidden="true"
        />
        {t("best_day_this_week")}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gr-700 mr-2">{date}</span>
        <span className="capitalize font-semibold text-gray-800">
          {activity}
        </span>
        <span className="ml-2 text-gr-700 font-mono">{score}/10</span>
      </div>
    </div>
  );
}
