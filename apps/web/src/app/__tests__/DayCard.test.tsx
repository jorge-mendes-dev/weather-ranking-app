import { render, screen } from "@testing-library/react";
import { DayCard } from "../components/DayCard";

describe("DayCard", () => {
  it("renders day card with activities", () => {
    render(
      <DayCard
        date="2026-04-21"
        weatherLabel="Sunny"
        bestActivity="Surfing"
        bestScore={9}
        bestReasoning="Great waves"
        activities={[{ type: "Skiing", score: 6, reasoning: "Snowy" }]}
      />,
    );
    expect(screen.getByText("Surfing")).toBeInTheDocument();
    expect(screen.getByText("Great waves")).toBeInTheDocument();
    expect(screen.getByText("Skiing")).toBeInTheDocument();
  });
});
