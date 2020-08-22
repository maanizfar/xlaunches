import React from "react";
import { render, RenderResult } from "@testing-library/react";

import Timeline from "./timeline";

describe("Timeline", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(
      <Timeline
        data={[
          {
            time: "2020-08-27T19:19:00-04:00",
            dotColor: "green",
            content: <div>content</div>,
          },
        ]}
      />
    );
  });

  test("should render time", () => {
    expect(root.getByText("August 28th, 2020")).toBeInTheDocument();
  });

  test("should render dot with given color", () => {
    expect(root.getByTestId("dot")).toHaveStyle("background-color: green");
  });
  test("should render content", () => {
    expect(root.getByText("content")).toBeInTheDocument();
  });
});
