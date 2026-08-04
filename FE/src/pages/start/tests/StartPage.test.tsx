import { MemoryRouter } from "react-router-dom";
import StartPage from "../StartPage";
import { render, screen } from "@testing-library/react";

const renderStartPage = () =>
  render(
    <MemoryRouter>
      <StartPage />
    </MemoryRouter>,
  );

describe("StartPage", () => {
  it("should render welcome message", () => {
    renderStartPage();

    expect(
      screen.getByRole("heading", { level: 1, name: "Welcome!" }), // find <h1>Welcome!</h1>
    ).toBeInTheDocument();
  });

  it("should render main description message", () => {
    renderStartPage();

    const paragraph = screen.getByText(/where would you like to go next\?/i);

    expect(paragraph.tagName).toBe("P"); // find <p> with this text
  });

  it("render navigation list", () => {
    renderStartPage();

    const navigationList = screen.getByRole("list");

    expect(navigationList).toBeInTheDocument();
  });

  it("render navigation list items", () => {
    renderStartPage();

    const navigationItems = screen.getAllByRole("listitem");

    expect(navigationItems).toHaveLength(2);
  });
});
