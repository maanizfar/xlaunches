import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 200,
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loading;
