import React, { useState } from "react";
import { useLaunchesQuery } from "../../generated/graphql";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Timeline from "../timeline";
import LaunchHistoryItem from "./launchHistoryItem";
import Loading from "../loading";

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
    notifyOnNetworkStatusChange: true,
  });
  const theme = useTheme();
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
        Launches
      </Typography>
      {loading && offset === startWith ? (
        <Loading />
      ) : (
        <>
          {past_launches && (
            <Timeline
              data={past_launches?.map((launch, i) => ({
                time: launch?.launch_date_local ? launch.launch_date_local : "",
                dotColor: launch?.upcoming
                  ? theme.palette.secondary.main
                  : launch?.launch_success
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                content: (
                  <LaunchHistoryItem
                    id={launch?.id ? launch?.id : ""}
                    title={launch?.mission_name ? launch?.mission_name : "N/A"}
                    details={launch?.details ? launch.details : "N/A"}
                    date={
                      launch?.launch_date_local ? launch.launch_date_local : ""
                    }
                    site={
                      launch?.launch_site?.site_name_long
                        ? launch.launch_site.site_name_long
                        : "N/A"
                    }
                    status={
                      launch?.upcoming
                        ? "Upcoming"
                        : launch?.launch_success
                        ? "Successful"
                        : "Failed"
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

export default LaunchHistory;
