import React from "react";
import { useNextLaunchQuery } from "../../generated/graphql";
import Timer from "./timer";
import Info from "./info";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../error";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: 200,
    textTransform: "uppercase",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      marginBottom: 0,
      marginTop: theme.spacing(8),
      textAlign: "left",
    },
  },
}));

const NextLaunch = () => {
  const { error, data } = useNextLaunchQuery();
  const { heading } = useStyles();

  const launchData = data?.launchNext;

  const mission_name =
    typeof launchData?.mission_name === "string"
      ? launchData.mission_name
      : "N/A";

  const launch_site =
    typeof launchData?.launch_site?.site_name_long === "string"
      ? launchData.launch_site.site_name_long
      : "N/A";

  const payloads =
    launchData?.rocket?.second_stage?.payloads !== undefined
      ? launchData.rocket.second_stage.payloads
      : null;

  const rocket_name =
    typeof launchData?.rocket?.rocket_name === "string"
      ? launchData.rocket.rocket_name
      : "N/A";

  const launch_date = launchData?.launch_date_local;

  if (error) return <Error />;

  return (
    <section id="next-launch">
      <Typography className={heading} component="h3" variant="button">
        NEXT LAUNCH
      </Typography>

      <>
        <Timer launchTime={launchData?.launch_date_local} />

        <Info
          mission_name={mission_name}
          launch_date={launch_date}
          launch_site={launch_site}
          rocket_name={rocket_name}
          payloads={payloads}
        />
      </>
    </section>
  );
};

export default NextLaunch;
