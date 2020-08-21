import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

type InfoRowProps = {
  label: string;
  labelColWidth:
    | boolean
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
  infoColWidth:
    | boolean
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
};

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  labelColWidth = 4,
  infoColWidth = 8,
  children,
}) => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={labelColWidth}>
        <Typography
          variant="body1"
          component="p"
          color="secondary"
          style={{ textTransform: "uppercase" }}
        >
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={infoColWidth}>
        {children}
      </Grid>
    </Grid>
  );
};

export default InfoRow;
