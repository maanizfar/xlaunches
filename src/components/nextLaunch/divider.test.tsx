import React from "react";
import { render } from "@testing-library/react";
import Divider from "./divider";

describe("Divider", () => {
  test("should render colon", () => {
    const { getByText } = render(<Divider />);

    getByText(":");
  });
});
