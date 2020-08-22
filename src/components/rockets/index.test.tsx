import React from "react";
import { render } from "@testing-library/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Rockets from ".";

describe("Rockets", () => {
  test("should render Heading", () => {
    const { getByText } = render(
      <ApolloProvider
        client={
          new ApolloClient({
            uri: "www.google.com",
            cache: new InMemoryCache(),
          })
        }
      >
        <Rockets />
      </ApolloProvider>
    );

    expect(getByText("Rockets")).toBeInTheDocument();
  });
});
