import React, { useState, useEffect, lazy, Suspense } from "react";
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

// import Home from "../pages/home";
// import LaunchesPage from "../pages/launches";
// import RocketsPage from "../pages/rockets";
// import AboutPage from "../pages/about";
// import LaunchDetailsPage from "../pages/launchDetails";
// import EventsPage from "../pages/events";
import Navigation from "./navigation";
import Loading from "./loading";

const Home = lazy(() => import("../pages/home"));
const LaunchesPage = lazy(() => import("../pages/launches"));
const RocketsPage = lazy(() => import("../pages/rockets"));
const AboutPage = lazy(() => import("../pages/about"));
const LaunchDetailsPage = lazy(() => import("../pages/launchDetails"));
const EventsPage = lazy(() => import("../pages/events"));

const App = () => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >(undefined);

  useEffect(() => {
    if (navigator.onLine) localStorage.clear();

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
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/launches" element={<LaunchesPage />} />
              <Route path="/launches/:id" element={<LaunchDetailsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/rockets" element={<RocketsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </ApolloProvider>
      )}
    </div>
  );
};

export default App;
