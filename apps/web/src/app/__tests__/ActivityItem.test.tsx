import { fireEvent, render, screen } from "@testing-library/react";
import { ActivityItem } from "../components/ActivityItem";

describe("ActivityItem", () => {
  it("renders activity, score, and reasoning", () => {
    render(
      <ActivityItem activity="Surfing" score={8} reasoning="Great waves" />,
    );
    expect(screen.getByText("Surfing")).toBeInTheDocument();
    expect(screen.getByText(/8/)).toBeInTheDocument();
    expect(screen.getByText("Great waves")).toBeInTheDocument();
  });

  it("expands and collapses on click", () => {
    render(
      <ActivityItem activity="Surfing" score={8} reasoning="Great waves" />,
    );
    const item = screen.getByRole("button");
    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-expanded", "false");
  });
});
