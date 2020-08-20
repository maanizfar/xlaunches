import React from "react";
import { render } from "@testing-library/react";
import NavLink from "./navLink";
import { BrowserRouter as Router } from "react-router-dom";

describe("NavLink", () => {
  test("should render route name", () => {
    const { getByText } = render(
      <Router>
        <NavLink name="About" to="/about" end={false} />
      </Router>
    );

    expect(getByText("About")).toBeInTheDocument();
  });
});
