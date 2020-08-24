import React from "react";
import { useLaunchDetailsQuery } from "../../generated/graphql";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "../loading";
import { Typography, Container } from "@material-ui/core";
import ReactPlayer from "react-player";
import Characteristic from "../characteristic";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(4),
  },

  contentContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  playerWrapper: {
    position: "relative",
    width: "100%",
    height: 300,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      minHeight: 500,
      height: "auto",
    },
  },

  videoPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  infoContainer: {
    width: "100%",
    [theme.breakpoints.only("xs")]: { padding: 0 },

    [theme.breakpoints.up("sm")]: {
      minWidth: 400,
    },
  },
}));

const LaunchDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useLaunchDetailsQuery({
    variables: {
      id,
    },
  });

  const classes = useStyles();

  if (error) return <p>error</p>;

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography
            component="h3"
            variant="h3"
            align="center"
            style={{ marginTop: "2rem" }}
            gutterBottom
          >
            {data?.launch?.mission_name}
          </Typography>
          <div className={classes.contentContainer}>
            <div>
              <br />
              {data?.launch?.links?.video_link && (
                <div className={classes.playerWrapper}>
                  <ReactPlayer
                    data-testid="react-player"
                    // light={true}
                    controls={true}
                    url={data.launch.links.video_link}
                    width="100%"
                    height="100%"
                    className={classes.videoPlayer}
                  />
                </div>
              )}
              <br />
              {data?.launch?.details && (
                <Typography
                  component="p"
                  variant="body1"
                  align="justify"
                  gutterBottom
                >
                  {data.launch.details}
                </Typography>
              )}
            </div>

            <Container className={classes.infoContainer}>
              <br />

              <Typography component="h5" variant="h5" align="center">
                Overview
              </Typography>
              <Characteristic
                label="Rocket"
                value={
                  data?.launch?.rocket?.rocket_name
                    ? data.launch.rocket.rocket_name
                    : "N/A"
                }
              />
              {data?.launch?.launch_site?.site_name_long && (
                <Characteristic
                  label="Launch Site"
                  value={data.launch.launch_site.site_name_long}
                />
              )}
              <Characteristic
                label="Launch Date"
                value={moment(data?.launch?.launch_date_local).format(
                  "MMMM DD, YYYY"
                )}
              />
              <Characteristic
                label="Successful"
                value={data?.launch?.launch_success ? "Yes" : "No"}
              />
              <br />
              {data?.launch?.rocket?.first_stage?.cores && (
                <>
                  <Typography component="h5" variant="h5" align="center">
                    First Stage
                  </Typography>
                  {data.launch.rocket.first_stage.cores.map((core, i) => (
                    <div key={i}>
                      <Characteristic
                        label="Reused Core"
                        value={core?.reused ? "Yes" : "No"}
                      />
                      {core?.flight && (
                        <Characteristic label="Flight #" value={core?.flight} />
                      )}
                      <Characteristic
                        label="Landing Intent"
                        value={core?.landing_intent ? "Yes" : "No"}
                      />
                      <Characteristic
                        label="Landing Success"
                        value={core?.land_success ? "Yes" : "No"}
                      />
                      {core?.landing_type && (
                        <Characteristic
                          label="Landing Type"
                          value={core?.landing_type}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}

              <br />
              {data?.launch?.rocket?.second_stage?.payloads && (
                <>
                  <Typography component="h5" variant="h5" align="center">
                    Second Stage
                  </Typography>

                  {data.launch.rocket.second_stage.payloads.map(
                    (payload, i) => (
                      <div key={i}>
                        {data.launch?.rocket?.second_stage?.payloads &&
                          data.launch.rocket.second_stage.payloads.length >
                            1 && (
                            <Typography variant="h6">
                              Payload # {i + 1}
                            </Typography>
                          )}
                        {payload?.payload_type && (
                          <Characteristic
                            label="Type"
                            value={payload.payload_type}
                          />
                        )}
                        {payload?.orbit && (
                          <Characteristic label="Orbit" value={payload.orbit} />
                        )}
                        {payload?.payload_mass_kg &&
                          payload.payload_mass_lbs && (
                            <Characteristic
                              label="Mass"
                              value={
                                payload.payload_mass_kg.toLocaleString() +
                                " kg / " +
                                payload.payload_mass_lbs.toLocaleString() +
                                " lbs"
                              }
                            />
                          )}
                        {payload?.manufacturer && (
                          <Characteristic
                            label="Manufacturer"
                            value={payload.manufacturer}
                          />
                        )}
                        {payload?.nationality && (
                          <Characteristic
                            label="Nationality"
                            value={payload.nationality}
                          />
                        )}
                        {payload?.customers && (
                          <Characteristic
                            label="Customers"
                            value={payload.customers.join(" / ")}
                          />
                        )}
                      </div>
                    )
                  )}
                </>
              )}
              <br />
              {data?.launch?.rocket?.fairings && (
                <>
                  <Typography component="h5" variant="h5" align="center">
                    Fairings
                  </Typography>

                  <Characteristic
                    label="Reused"
                    value={data.launch.rocket.fairings.reused ? "Yes" : "No"}
                  />

                  <Characteristic
                    label="Recovery Attempt"
                    value={
                      data.launch.rocket.fairings.recovery_attempt
                        ? "Yes"
                        : "No"
                    }
                  />
                  <Characteristic
                    label="Recovered"
                    value={data.launch.rocket.fairings.recovered ? "Yes" : "No"}
                  />
                </>
              )}
            </Container>
          </div>
        </>
      )}
    </Container>
  );
};

export default LaunchDetails;
