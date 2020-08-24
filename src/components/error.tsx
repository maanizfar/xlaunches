import React from "react";
import { Typography } from "@material-ui/core";

const Error = () => {
  return (
    <div style={{ margin: "4rem 0" }}>
      <Typography variant="body1" component="h1" color="error" align="center">
        Error: Please check your internet connection
      </Typography>
    </div>
  );
};

export default Error;
