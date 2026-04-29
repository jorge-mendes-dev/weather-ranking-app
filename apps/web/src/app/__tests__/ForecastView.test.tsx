import { render, screen } from "@testing-library/react";
import { ForecastView } from "../components/ForecastView";
import { ProcessedForecast } from "../utils/processForecast";

describe("ForecastView", () => {
  const forecast: ProcessedForecast = {
    days: [
      {
        date: "2026-04-21",
        bestActivity: { type: "Surfing", score: 8, reasoning: "Great waves" },
        otherActivities: [{ type: "Skiing", score: 6, reasoning: "Snowy" }],
      },
    ],
    bestDay: {
      date: "2026-04-21",
      bestActivity: { type: "Surfing", score: 8, reasoning: "Great waves" },
    },
    bestToday: { type: "Surfing", score: 8, reasoning: "Great waves" },
  };

  it("renders forecast view with city name", () => {
    render(<ForecastView forecast={forecast} cityName="London" />);
    expect(
      screen.getByText((content) => content.includes("London")),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Surfing").length).toBeGreaterThan(0);
    expect(screen.getByText("Skiing")).toBeInTheDocument();
  });
});
