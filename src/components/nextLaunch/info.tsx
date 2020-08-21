import React from "react";
import Grid from "@material-ui/core/Grid";
import { Payload, Maybe } from "../../generated/graphql";
import moment from "moment";
import InfoRow from "./infoRow";
import { makeStyles } from "@material-ui/core/styles";
import Payloads from "./payloads";
import { Typography } from "@material-ui/core";

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
        <InfoRow label="Mission" infoColWidth={6} labelColWidth={6}>
          <Typography variant="body1" component="p">
            {mission_name}
          </Typography>
        </InfoRow>
        <InfoRow label="Launch Date" infoColWidth={6} labelColWidth={6}>
          <Typography variant="body1" component="p">
            {moment(launch_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </InfoRow>
        <InfoRow label="Launch Site" infoColWidth={6} labelColWidth={6}>
          <Typography variant="body1" component="p">
            {launch_site}
          </Typography>
        </InfoRow>
        <InfoRow label="rocket" infoColWidth={6} labelColWidth={6}>
          <Typography variant="body1" component="p">
            {rocket_name}
          </Typography>
        </InfoRow>
      </Grid>

      <Grid item xs={12} md={4}>
        <Payloads payloads={payloads} />
      </Grid>
    </Grid>
  );
};

export default Info;
