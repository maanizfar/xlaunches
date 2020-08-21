import React from "react";
import { render, RenderResult } from "@testing-library/react";
import NextLaunch from ".";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

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
        <NextLaunch />
      </ApolloProvider>
    );
  });

  test("should render heading", () => {
    expect(root.getByText(/Next launch/i)).toBeInTheDocument();
  });
});
