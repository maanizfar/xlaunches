import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    fontSize: "2.25rem",

    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "6rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "7rem",
    },
  },
}));

const Divider = () => {
  const { divider } = useStyles();

  return <div className={divider}>:</div>;
};

export default Divider;
