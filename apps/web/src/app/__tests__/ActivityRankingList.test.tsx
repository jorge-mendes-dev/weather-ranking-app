import { render, screen } from "@testing-library/react";
import { Ranking } from "@weather-app/types";
import { ActivityRankingList } from "../components/ActivityRankingList";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key, opts) => key }),
}));

describe("ActivityRankingList", () => {
  const rankings: Ranking[] = [
    {
      activity: "Surfing",
      score: 8,
      day: "2026-04-21",
      conditions: {
        temperature: 20,
        windSpeed: 10,
        precipitation: 0,
        uvIndex: 5,
      },
    },
    {
      activity: "Skiing",
      score: 6,
      day: "2026-04-21",
      conditions: {
        temperature: -2,
        windSpeed: 5,
        precipitation: 2,
        uvIndex: 1,
      },
    },
  ];
  const emojiMap = { Surfing: "🏄", Skiing: "⛷️" };

  it("renders a list of activity rankings", () => {
    render(<ActivityRankingList rankings={rankings} emojiMap={emojiMap} />);
    expect(screen.getByText("Surfing")).toBeInTheDocument();
    expect(screen.getByText("Skiing")).toBeInTheDocument();
  });
});
