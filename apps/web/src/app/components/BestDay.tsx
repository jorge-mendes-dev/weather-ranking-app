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
    <div className="bg-white/95 border border-gray-300 rounded-2xl p-6 font-display flex flex-col gap-3 shadow-[0_4px_32px_0_rgba(27,97,201,0.07)] transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(27,97,201,0.13)] hover:bg-blue-50/30 hover:-translate-y-1 hover:scale-[1.025] focus:shadow-xl focus:border-blue-400 mb-6">
      <div className="text-base font-bold text-color-text mb-1 flex items-center gap-2 drop-shadow-sm">
        <CalendarDaysIcon
          className="h-5 w-5 text-blue-400 mr-1 opacity-80"
          aria-hidden="true"
        />
        {t("best_day_this_week")}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-blue-700 mr-2 tracking-tight leading-tight">
          {date}
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
