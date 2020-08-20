import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Drawer from "./drawer";
import routes from "../../routes";

describe("Drawer", () => {
  test("should render all routes", () => {
    const { getByText } = render(
      <Router>
        <Drawer open={true} onClickHandler={jest.fn()} />
      </Router>
    );

    routes.forEach((route) => {
      expect(getByText(route.name)).toBeInTheDocument();
    });
  });
});
