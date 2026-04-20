// Utility to process weather forecast and activities for the app state machine
// Types
export type Activity = {
  type: "SURFING" | "SKIING" | "OUTDOOR" | "INDOOR";
  score: number;
  reasoning: string;
};

export type DayForecast = {
  date: string;
  activities: Activity[];
};

export type ProcessedForecast = {
  days: Array<{
    date: string;
    bestActivity: Activity;
    otherActivities: Activity[];
  }>;
  bestDay: {
    date: string;
    bestActivity: Activity;
  };
  bestToday: Activity;
};

// Main processing function
export function processForecast(data: DayForecast[]): ProcessedForecast {
  if (!data || data.length === 0) {
    throw new Error("No forecast data");
  }

  // Sort activities for each day
  const days = data.map((day) => {
    const sorted = [...day.activities].sort((a, b) => b.score - a.score);
    return {
      date: day.date,
      bestActivity: sorted[0],
      otherActivities: sorted.slice(1),
    };
  });

  // Find best day (highest score across all days)
  let bestDayIdx = 0;
  let bestScore = days[0].bestActivity.score;
  days.forEach((d, i) => {
    if (d.bestActivity.score > bestScore) {
      bestScore = d.bestActivity.score;
      bestDayIdx = i;
    }
  });

  return {
    days,
    bestDay: {
      date: days[bestDayIdx].date,
      bestActivity: days[bestDayIdx].bestActivity,
    },
    bestToday: days[0].bestActivity,
  };
}
