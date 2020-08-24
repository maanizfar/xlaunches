import React from "react";
import { render } from "@testing-library/react";
import PayloadInfo from "./payloadInfo";

describe("Payload info", () => {
  test("should render all info rows", () => {
    const { getByText } = render(
      <PayloadInfo
        number={1}
        orbit="SSO"
        manufacturer="Salman"
        nationality="Pakistani"
        customers={["Sal", "man"]}
      />
    );

    getByText(/Payload #/i);
    getByText("1");
    getByText(/orbit/i);
    getByText("SSO");
    getByText(/manufacturer/i);
    getByText("Salman");
    getByText(/nationality/i);
    getByText("Pakistani");
    getByText(/customers/i);
    getByText("Sal | man");
  });
});
