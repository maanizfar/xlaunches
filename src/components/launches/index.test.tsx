import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import LaunchHistory from ".";

describe("Next Launch", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(
      <ApolloProvider
        client={
          new ApolloClient({
            uri: "www.google.com",
            cache: new InMemoryCache(),
          })
        }
      >
        <LaunchHistory />
      </ApolloProvider>
    );
  });

  test("should render heading", () => {
    expect(root.getByText(/Launches/i)).toBeInTheDocument();
  });
});
