import React from "react";
import Grid from "@material-ui/core/Grid";
import { Payload, Maybe } from "../../generated/graphql";
import moment from "moment";
import InfoRow from "./infoRow";
import { makeStyles } from "@material-ui/core/styles";
import Payloads from "./payloads";
import { Typography } from "@material-ui/core";
import Characteristic from "../characteristic";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
  },
}));

type NextLaunchInfoProps = {
  mission_name: string;
  launch_date: string;
  launch_site: string;
  rocket_name: string;
  payloads: Maybe<Maybe<Payload>[] | null>;
};

const Info: React.FC<NextLaunchInfoProps> = ({
  mission_name,
  launch_date,
  launch_site,
  rocket_name,
  payloads,
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      spacing={1}
      justify="space-between"
    >
      <Grid container item xs={12} md={6} spacing={2}>
        <Characteristic label="Mission" value={mission_name} />
        <Characteristic
          label="Launch Date"
          value={moment(launch_date).format("MMMM Do YYYY, h:mm:ss a")}
        />
        <Characteristic label="Launch Site" value={launch_site} />
        <Characteristic label="Rocket" value={rocket_name} />
      </Grid>

      <Grid item xs={12} md={4}>
        <Payloads payloads={payloads} />
      </Grid>
    </Grid>
  );
};

export default Info;
