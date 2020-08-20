import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./navbar";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "../../routes";

describe("Navbar", () => {
  test("should render all routes", () => {
    const { getByText } = render(
      <Router>
        <Navbar onMenuClickHandler={jest.fn()} />
      </Router>
    );

    routes.forEach((route) => {
      expect(getByText(route.name)).toBeInTheDocument();
    });
  });
});
