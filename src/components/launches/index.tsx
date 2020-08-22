import React, { useState } from "react";
import { useLaunchesQuery } from "../../generated/graphql";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Timeline from "../timeline";
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
}));

const LaunchHistory = () => {
  const startWith = 20;
  const launchesToFetch = 3;

  const [offset, setOffset] = useState(20);
  const { loading, error, data, fetchMore } = useLaunchesQuery({
    variables: {
      order: "desc",
      sort: "launch_date_local",
      limit: startWith,
      offset: 0,
    },
  });
  const { heading, buttonContainer } = useStyles();

  if (error) return <p>error</p>;

  const past_launches = data?.launches?.filter((launch) => !launch?.upcoming);

  function loadMoreHandler() {
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
          {past_launches && (
            <Timeline
              data={past_launches?.map((launch, i) => ({
                time: launch?.launch_date_local ? launch.launch_date_local : "",
                dotColor: launch?.launch_success ? "green" : "red",
                content: (
                  <LaunchHistoryItem
                    id={launch?.id ? launch?.id : ""}
                    title={launch?.mission_name ? launch?.mission_name : "N/A"}
                    date={
                      launch?.launch_date_local ? launch.launch_date_local : ""
                    }
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
                ),
              }))}
            />
          )}

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
