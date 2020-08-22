import React from "react";
import { render, RenderResult } from "@testing-library/react";

import EventItem from "./eventItem";

describe("Event item", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(
      <EventItem
        title="event title"
        date="2020-08-27T19:19:00-04:00"
        details="event details"
        videolink="www.youtube.com"
      />
    );
  });

  test("should render title", () => {
    expect(root.getByText("event title")).toBeInTheDocument();
  });

  test("should not render date", () => {
    expect(root.queryByText("Augest 8th, 2020")).not.toBeInTheDocument();
  });

  test("should render details", () => {
    expect(root.getByText("event details")).toBeInTheDocument();
  });

  test("should render video", () => {
    expect(root.getByTestId("react-player")).toBeInTheDocument();
  });
});
