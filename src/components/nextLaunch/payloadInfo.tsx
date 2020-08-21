import React from "react";
import Grid from "@material-ui/core/Grid";
import { Maybe } from "graphql/jsutils/Maybe";
import InfoRow from "./infoRow";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.up("md")]: {
      textAlign: "right",
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
      <InfoRow label="Payload #" labelColWidth={6} infoColWidth={6}>
        <Typography variant="body1" component="p">
          {number}
        </Typography>
      </InfoRow>
      <InfoRow label="Orbit" labelColWidth={6} infoColWidth={6}>
        <Typography variant="body1" component="p">
          {orbit}
        </Typography>
      </InfoRow>
      <InfoRow label="Manufacturer" labelColWidth={6} infoColWidth={6}>
        <Typography variant="body1" component="p">
          {manufacturer}
        </Typography>
      </InfoRow>
      <InfoRow label="Nationality" labelColWidth={6} infoColWidth={6}>
        <Typography variant="body1" component="p">
          {nationality}
        </Typography>
      </InfoRow>
      <InfoRow label="Customers" labelColWidth={6} infoColWidth={6}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {customers?.map((c, i) => (
            <li key={i}>
              {" "}
              <Typography variant="body1" component="p">
                {c}
              </Typography>
            </li>
          ))}
        </ul>
      </InfoRow>
    </Grid>
  );
};

export default PayloadInfo;
