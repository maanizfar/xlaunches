import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
    marginBottom: theme.spacing(5),
    maxWidth: 600,
  },

  statusText: {
    color: (props: { status: string }) =>
      props.status === "Successful"
        ? theme.palette.success.main
        : props.status === "Failed"
        ? theme.palette.error.main
        : theme.palette.text.primary,
  },
}));

type LaunchHistoryItemProps = {
  id: string;
  date: string;
  title: string;
  details: string;
  site: string;
  status: string;
  rocket: string;
};

const LaunchHistoryItem: React.FC<LaunchHistoryItemProps> = ({
  id,
  title,
  date,
  site,
  status,
  rocket,
  details,
}: LaunchHistoryItemProps) => {
  const { container, statusText } = useStyles({ status });
  const navigate = useNavigate();

  return (
    <div className={container}>
      <Hidden smUp>
        <Typography
          variant="body1"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          {moment(date).format("MMMM Do, YYYY")}
        </Typography>
      </Hidden>

      <Link to={id} style={{ textDecoration: "none" }}>
        <Typography component="h5" variant="h5" color="secondary" gutterBottom>
          {title}
        </Typography>
      </Link>

      <Typography variant="body1" align="justify" gutterBottom>
        {details}
      </Typography>

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
        {status}
      </Typography>

      <Button variant="outlined" color="secondary" onClick={() => navigate(id)}>
        More Details
      </Button>
    </div>
  );
};

export default LaunchHistoryItem;
