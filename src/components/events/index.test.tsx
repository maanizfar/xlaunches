import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Events from ".";

describe("Event item", () => {
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
        <Events />
      </ApolloProvider>
    );
  });

  test("should render heading", () => {
    expect(root.getByText("Events")).toBeInTheDocument();
  });

  test("should render LoadMore button", () => {
    root.findByText(/load more/i);
  });
});
