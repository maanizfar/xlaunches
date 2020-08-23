import React from "react";
import Grid from "@material-ui/core/Grid";
import { Maybe } from "graphql/jsutils/Maybe";
import { makeStyles } from "@material-ui/core/styles";
import Characteristic from "../characteristic";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
    border: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
}));

type PayloadInfoProps = {
  number: number;
  orbit: string;
  manufacturer: string;
  nationality: string;
  customers: Maybe<string>[];
};

const PayloadInfo: React.FC<PayloadInfoProps> = ({
  number,
  orbit,
  manufacturer,
  nationality,
  customers,
}: PayloadInfoProps) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={1}>
      <Characteristic label="Payload #" value={number} />
      <Characteristic label="Orbit" value={orbit} />
      <Characteristic label="Manufacturer" value={manufacturer} />
      <Characteristic label="Nationality" value={nationality} />
      <Characteristic label="Customers" value={customers.join(" | ")} />
    </Grid>
  );
};

export default PayloadInfo;
