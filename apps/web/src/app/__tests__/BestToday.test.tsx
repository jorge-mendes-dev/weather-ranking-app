import { render, screen } from "@testing-library/react";
import { BestToday } from "../components/BestToday";

describe("BestToday", () => {
  it("renders best today details", () => {
    render(
      <BestToday activity="Surfing" score={8} reasoning="Perfect conditions" />,
    );
    expect(screen.getByText("Surfing")).toBeInTheDocument();
    expect(screen.getByText(/8/)).toBeInTheDocument();
    expect(screen.getByText("Perfect conditions")).toBeInTheDocument();
  });
});
