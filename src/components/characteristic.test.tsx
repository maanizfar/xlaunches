import React from "react";
import { render } from "@testing-library/react";
import Characteristic from "./characteristic";

describe("Characteristic", () => {
  test("should render label, value and unit", () => {
    const { getByText } = render(
      <Characteristic label="Label" value="value" unit="unit" />
    );

    expect(getByText("Label")).toBeInTheDocument();
    expect(getByText("value unit")).toBeInTheDocument();
  });
});
