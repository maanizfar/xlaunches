import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { persistCache } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

import Home from "../pages/home";
import LaunchesPage from "../pages/launches";
import RocketsPage from "../pages/rockets";
import AboutPage from "../pages/about";
import LaunchDetailsPage from "../pages/launchDetails";
import EventsPage from "../pages/events";
import Navigation from "./navigation";
import Loading from "./loading";

const App = () => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >(undefined);

  useEffect(() => {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            launches: offsetLimitPagination(),
            histories: offsetLimitPagination(),
          },
        },
      },
    });

    const client = new ApolloClient({
      uri: "https://api.spacex.land/graphql",
      cache,
    });

    persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    }).then(() => {
      setClient(client);
    });

    return () => {};
  }, []);

  return (
    <div>
      {client === undefined ? (
        <Loading />
      ) : (
        <ApolloProvider client={client}>
          <Navigation data-testid="nav" />
          <Routes>
            <Route path="/launches" element={<LaunchesPage />} />
            <Route path="/launches/:id" element={<LaunchDetailsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/rockets" element={<RocketsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ApolloProvider>
      )}
    </div>
  );
};

export default App;
