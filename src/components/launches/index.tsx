import React, { useState } from "react";
import moment from "moment";
import { useLaunchesQuery } from "../../generated/graphql";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

import LaunchHistoryItem from "./launchHistoryItem";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(4),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(4),
  },

  content: {
    padding: 0,
    flexGrow: 2.5,

    [theme.breakpoints.up("md")]: {
      flexGrow: 1.6,
    },
  },
}));

const LaunchHistory = () => {
  const [offset, setOffset] = useState(20);
  const { loading, error, data, fetchMore } = useLaunchesQuery({
    variables: {
      order: "desc",
      sort: "launch_date_local",
      limit: 20,
      offset: 0,
    },
  });
  const { heading, buttonContainer, content } = useStyles();

  if (error) return <p>error</p>;

  const past_launches = data?.launches?.filter((launch) => !launch?.upcoming);

  function loadMoreHandler() {
    const launchesToFetch = 5;

    fetchMore({
      variables: {
        order: "desc",
        sort: "launch_date_local",
        limit: launchesToFetch,
        offset: offset,
      },
    });
    setOffset(offset + launchesToFetch);
  }
  return (
    <div>
      <Typography
        className={heading}
        component="h3"
        variant="h3"
        align="center"
      >
        Launch History
      </Typography>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Timeline align="left" data-testid="timeline">
            {past_launches?.map((launch, i) => (
              <TimelineItem key={i}>
                <TimelineOppositeContent>
                  <Typography
                    variant="body1"
                    component="p"
                    style={{ margin: 0 }}
                  >
                    {moment(launch?.launch_date_local).format("MMMM Do, YYYY")}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      backgroundColor: launch?.launch_success ? "green" : "red",
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  classes={{
                    root: content,
                  }}
                >
                  <LaunchHistoryItem
                    id={launch?.id ? launch?.id : ""}
                    title={launch?.mission_name ? launch?.mission_name : "N/A"}
                    site={
                      launch?.launch_site?.site_name_long
                        ? launch.launch_site.site_name_long
                        : "N/A"
                    }
                    status={
                      launch?.launch_success ? launch.launch_success : false
                    }
                    rocket={
                      launch?.rocket?.rocket_name
                        ? launch.rocket.rocket_name
                        : "N/A"
                    }
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
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

export default LaunchHistory;
