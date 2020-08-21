import React from "react";
import { render } from "@testing-library/react";
import InfoRow from "./infoRow";

describe("Info Row", () => {
  test("should render label and info", () => {
    const { getByText } = render(
      <InfoRow label="label" infoColWidth={6} labelColWidth={6}>
        Info
      </InfoRow>
    );

    getByText("label:");
    getByText("Info");
  });
});
