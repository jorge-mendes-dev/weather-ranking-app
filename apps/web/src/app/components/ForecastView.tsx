import type { ProcessedForecast } from "../utils/processForecast";
import { BestDay } from "./BestDay";
import { BestToday } from "./BestToday";
import { DayCard } from "./DayCard";

interface ForecastViewProps {
  forecast: ProcessedForecast;
}

export function ForecastView({ forecast }: ForecastViewProps) {
  return (
    <section className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
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
      <div className="flex flex-col gap-6 mt-8">
        {forecast.days.map((day) => (
          <DayCard
            key={day.date}
            date={day.date}
            weatherLabel={""}
            bestActivity={day.bestActivity.type}
            bestScore={day.bestActivity.score}
            bestReasoning={day.bestActivity.reasoning}
            activities={[day.bestActivity, ...day.otherActivities]}
          />
        ))}
      </div>
    </section>
  );
}
