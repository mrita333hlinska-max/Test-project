import { MemoryRouter } from "react-router-dom";
import StartPage from "../StartPage";
import { render, screen } from "@testing-library/react";

describe("StartPage", () => {
  it("should render welcome message", () => {
    render(
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Welcome! Where would you like to go next?"),
    ).toBeInTheDocument();
  });
});
