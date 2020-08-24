import React, { useState } from "react";
import { useEventsQuery } from "../../generated/graphql";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Timeline from "../timeline";
import EventItem from "./eventItem";
import Loading from "../loading";
import Error from "../error";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(4),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
}));

const Events = () => {
  const startWith = 5;
  const eventsToFetch = 3;

  const [offset, setOffset] = useState(startWith);
  const { loading, error, data, fetchMore } = useEventsQuery({
    variables: {
      order: "desc",
      sort: "event_date_utc",
      limit: startWith,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const theme = useTheme();
  const { heading, buttonContainer } = useStyles();

  if (error) return <Error />;

  function loadMoreHandler() {
    fetchMore({
      variables: {
        order: "desc",
        sort: "event_date_utc",
        limit: eventsToFetch,
        offset: offset,
      },
    });

    setOffset(offset + eventsToFetch);
  }
  return (
    <div>
      <Typography
        className={heading}
        component="h3"
        variant="h3"
        align="center"
      >
        Events
      </Typography>
      {loading && offset === startWith ? (
        <Loading />
      ) : (
        <>
          {data?.histories && (
            <Timeline
              data={data.histories?.map((event, i) => ({
                time: event?.event_date_utc ? event.event_date_utc : "",
                dotColor: theme.palette.secondary.main,
                content: (
                  <EventItem
                    title={event?.title ? event.title : "N/A"}
                    date={event?.event_date_utc ? event.event_date_utc : "N/A"}
                    details={event?.details ? event.details : "N/A"}
                    videolink={
                      event?.flight?.links?.video_link
                        ? event.flight.links.video_link
                        : null
                    }
                  />
                ),
              }))}
            />
          )}
          {loading && <Loading />}

          <div className={buttonContainer}>
            <Button
              color="secondary"
              variant="contained"
              onClick={loadMoreHandler}
            >
              Load more
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
