import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import About from ".";

describe("Event item", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(
      <ApolloProvider
        client={
          new ApolloClient({
            uri: "https://api.spacex.land",
            cache: new InMemoryCache(),
          })
        }
      >
        <About />
      </ApolloProvider>
    );
  });

  test("should render website heading", () => {
    expect(root.getByText(/about this website/i)).toBeInTheDocument();
  });
  test("should render website summary", () => {
    expect(
      root.getByText(
        /Xlaunches is an open source web application for viewing future and past SpaceX launches. It has a countdown timer that shows the time before the next launch, and information about each previous launch and event./i
      )
    ).toBeInTheDocument();
  });
  test("should render created by", () => {
    expect(root.getByText(/created by/i)).toBeInTheDocument();
  });
  test("should render creator's name", () => {
    expect(root.getByText(/salman zafar/i)).toBeInTheDocument();
  });
  test("should render data provided by", () => {
    expect(root.getByText(/data provided by/i)).toBeInTheDocument();
  });
  test("should render creator's name", () => {
    expect(root.getByText("https://api.spacex.land")).toBeInTheDocument();
  });

  test("should render spacex heading", () => {
    root.findByText(/about spacex/i);
  });
});
