import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Timer from "./timer";

describe("Timer", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(<Timer launchTime="2020-08-27T19:19:00-04:00" />);
  });

  test("should render time labels", () => {
    // expect(root.getByText(/days/i)).toBeInTheDocument();
    expect(root.getByText(/hours/i)).toBeInTheDocument();
    expect(root.getByText(/minutes/i)).toBeInTheDocument();
    expect(root.getByText(/seconds/i)).toBeInTheDocument();
  });

  // test("should render time", () => {
  //   expect(root.getByTestId("days")).not.toBeEmpty();
  //   expect(root.getByTestId("hours")).not.toBeEmpty();
  //   expect(root.getByTestId("minutes")).not.toBeEmpty();
  //   expect(root.getByTestId("seconds")).not.toBeEmpty();
  // });
});
