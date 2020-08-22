import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LaunchHistoryItem from "./launchHistoryItem";

describe("Launch History Item", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(
      <Router>
        <LaunchHistoryItem
          id="100"
          title="mission title"
          site="launch site"
          rocket="rocket name"
          status={true}
        />
      </Router>
    );
  });

  test("should render title", () => {
    expect(root.getByText("mission title")).toBeInTheDocument();
  });
  test("should render launch site", () => {
    expect(root.getByText("launch site")).toBeInTheDocument();
  });
  test("should render rocket name", () => {
    expect(root.getByText("rocket name")).toBeInTheDocument();
  });
  test("should render status", () => {
    expect(root.getByText("Successful")).toBeInTheDocument();
  });
});
