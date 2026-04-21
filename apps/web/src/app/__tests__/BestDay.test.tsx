import { render, screen } from "@testing-library/react";
import { BestDay } from "../components/BestDay";

describe("BestDay", () => {
  it("renders best day details", () => {
    render(<BestDay date="2026-04-21" activity="Surfing" score={9} />);
    expect(screen.getByText("Surfing")).toBeInTheDocument();
    expect(screen.getByText(/9\/10/)).toBeInTheDocument();
  });
});
