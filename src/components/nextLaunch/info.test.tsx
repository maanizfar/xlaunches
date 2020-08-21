import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Info from "./info";

describe("Next Launch Info", () => {
  test("should render info", () => {
    const { getByText } = render(
      <Info
        mission_name="salman"
        launch_date="2020-08-27T19:19:00-04:00"
        launch_site="lahore"
        rocket_name="falcon"
        payloads={[]}
      />
    );

    expect(getByText(/mission/i)).toBeInTheDocument();
    expect(getByText(/Launch date/i)).toBeInTheDocument();
    expect(getByText(/Launch site/i)).toBeInTheDocument();
    expect(getByText(/rocket/i)).toBeInTheDocument();
  });
});
