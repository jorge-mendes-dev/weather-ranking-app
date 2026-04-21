import { useTranslation } from "react-i18next";
import type { ProcessedForecast } from "../utils/processForecast";
import { BestDay } from "./BestDay";
import { BestToday } from "./BestToday";
import { DayCard } from "./DayCard";

interface ForecastViewProps {
  forecast: ProcessedForecast;
  cityName?: string;
}

/**
 * Displays the main forecast view, including best today, best day, and daily cards.
 * @param {ForecastViewProps} props - The props for the component.
 */
export function ForecastView({ forecast, cityName }: ForecastViewProps) {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      {cityName && (
        <div className="w-full flex justify-center mb-2">
          <h2
            className="text-xl font-semibold text-green-500"
            data-testid="selected-city"
          >
            <section className="flex flex-col gap-10 w-full max-w-3xl mx-auto px-2 md:px-0">
              {cityName && (
                <div className="w-full flex justify-center mb-4">
                  <h2
                    className="text-2xl font-bold text-blue-700 drop-shadow-sm tracking-tight leading-tight"
                    data-testid="selected-city"
                  >
                    - {cityName} -
                  </h2>
                </div>
              )}
              <BestToday
                activity={forecast.bestToday.type}
                score={forecast.bestToday.score}
                reasoning={forecast.bestToday.reasoning}
              />
              <BestDay
                date={forecast.bestDay.date}
                activity={forecast.bestDay.bestActivity.type}
                score={forecast.bestDay.bestActivity.score}
              />
              <div className="flex flex-col gap-8 mt-10">
                {forecast.days.map((day) => (
                  <DayCard
                    key={day.date}
                    date={day.date}
                    weatherLabel={""}
                    bestActivity={day.bestActivity.type}
                    bestScore={day.bestActivity.score}
                    bestReasoning={day.bestActivity.reasoning}
                    activities={day.otherActivities}
                  />
                ))}
              </div>
            </section>
          </h2>
        </div>
      )}
    </section>
  );
}
