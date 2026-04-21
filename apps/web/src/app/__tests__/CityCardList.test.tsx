import { fireEvent, render, screen } from "@testing-library/react";
import type { City } from "@weather-app/types";
import { CityCardList } from "../components/CityCardList";

describe("CityCardList", () => {
  const cities: City[] = [
    { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
  ];

  it("renders city cards", () => {
    render(
      <CityCardList
        cities={cities}
        onSelect={() => {}}
        selectedCity={null}
        loading={false}
      />,
    );
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });

  it("calls onSelect when a city is clicked", () => {
    const onSelect = jest.fn();
    render(
      <CityCardList
        cities={cities}
        onSelect={onSelect}
        selectedCity={null}
        loading={false}
      />,
    );
    fireEvent.click(screen.getByText("London"));
    expect(onSelect).toHaveBeenCalledWith(cities[0]);
  });

  it("shows selected city with correct style", () => {
    render(
      <CityCardList
        cities={cities}
        onSelect={() => {}}
        selectedCity={cities[1]}
        loading={false}
      />,
    );
    const selected = screen.getByText("Paris").closest("button");
    expect(selected).toHaveClass("border-blue-600");
  });

  it("disables buttons when loading", () => {
    render(
      <CityCardList
        cities={cities}
        onSelect={() => {}}
        selectedCity={null}
        loading={true}
      />,
    );
    const button = screen.getByText("London").closest("button");
    expect(button).toBeDisabled();
  });
});
