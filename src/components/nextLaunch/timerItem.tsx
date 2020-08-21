import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: "3.5rem",
    fontFamily: "'Iceberg', cursive",
    lineHeight: 0.9,

    [theme.breakpoints.up("sm")]: {
      fontSize: "7rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "10rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "12rem",
    },
  },
  label: {},
}));

type TimerItemProps = {
  value: string;
};

const TimerItem: React.FC<TimerItemProps> = ({ value, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography component="p" className={classes.value} color="textSecondary">
        {value}
      </Typography>
      <Typography component="p" variant="button" className={classes.label}>
        {children}
      </Typography>
    </div>
  );
};

export default TimerItem;
