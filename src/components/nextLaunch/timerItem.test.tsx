import React from "react";
import { render } from "@testing-library/react";
import TimerItem from "./timerItem";

describe("Timer Item", () => {
  test("renders label", () => {
    const { getByText } = render(<TimerItem value="03">Seconds</TimerItem>);

    expect(getByText("Seconds")).toBeInTheDocument();
  });
});
