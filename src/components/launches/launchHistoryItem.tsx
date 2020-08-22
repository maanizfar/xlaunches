import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    marginTop: 0,
    marginBottom: theme.spacing(5),
    maxWidth: 500,
  },

  titleText: {
    transition: "all 0.3s ease-in",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },

  statusText: {
    color: (props: { status: boolean }) =>
      props.status ? theme.palette.success.light : theme.palette.error.light,
  },
}));

type LaunchHistoryItemProps = {
  id: string;
  title: string;
  site: string;
  status: boolean;
  rocket: string;
};

const LaunchHistoryItem: React.FC<LaunchHistoryItemProps> = ({
  id,
  title,
  site,
  status,
  rocket,
}: LaunchHistoryItemProps) => {
  const { container, titleText, statusText } = useStyles({ status });

  return (
    <div className={container}>
      <Link to={id} style={{ textDecoration: "none" }}>
        <Typography
          component="h5"
          variant="h5"
          color="textPrimary"
          className={titleText}
          gutterBottom
        >
          {title}
        </Typography>
      </Link>

      <Typography component="p" variant="body1" gutterBottom>
        <Typography variant="inherit" color="textSecondary">
          LAUNCH SITE:{" "}
        </Typography>
        {site}
      </Typography>

      <Typography component="p" variant="body1" gutterBottom>
        <Typography variant="inherit" color="textSecondary">
          ROCKET:{" "}
        </Typography>
        {rocket}
      </Typography>

      <Typography
        component="p"
        variant="body1"
        gutterBottom
        className={statusText}
      >
        <Typography variant="inherit" color="textSecondary">
          STATUS:{" "}
        </Typography>
        {status ? "Successful" : "Failed"}
      </Typography>

      <Button variant="outlined" color="secondary">
        More Details
      </Button>
    </div>
  );
};

export default LaunchHistoryItem;
