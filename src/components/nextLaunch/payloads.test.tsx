import React from "react";
import { render } from "@testing-library/react";
import Payloads from "./payloads";
import { Payload } from "../../generated/graphql";

describe("Payloads", () => {
  test("should render heading", () => {
    const mockPayload: Payload = {
      orbit: "SSO",
      manufacturer: "Salman",
      nationality: "Pakistani",
      customers: ["Sal"],
    };

    const { getByText } = render(<Payloads payloads={[mockPayload]} />);

    getByText(/payloads/i);
    getByText("SSO");
    getByText("Salman");
    getByText("Pakistani");
    getByText("Sal");
  });
});
