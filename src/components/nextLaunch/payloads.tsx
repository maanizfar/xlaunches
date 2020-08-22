import React from "react";
import Typography from "@material-ui/core/Typography";
import PayloadInfo from "./payloadInfo";
import { Maybe, Payload } from "../../generated/graphql";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    textAlign: "center",
    textTransform: "uppercase",

    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
}));

type PayloadProps = {
  payloads: Maybe<Maybe<Payload>[] | null>;
};

const Payloads: React.FC<PayloadProps> = ({ payloads }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.heading}
        component="h6"
        variant="h6"
        color="secondary"
      >
        Payloads
      </Typography>
      {payloads?.map((payload, i) => (
        <PayloadInfo
          key={i}
          number={i + 1}
          orbit={typeof payload?.orbit === "string" ? payload.orbit : "N/A"}
          manufacturer={
            typeof payload?.manufacturer === "string"
              ? payload.manufacturer
              : "N/A"
          }
          nationality={
            typeof payload?.nationality === "string"
              ? payload.nationality
              : "N/A"
          }
          customers={
            payload?.customers === null || payload?.customers === undefined
              ? ["N/A"]
              : payload.customers
          }
        />
      ))}
    </>
  );
};

export default Payloads;
