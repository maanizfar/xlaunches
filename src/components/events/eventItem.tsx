import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
    marginBottom: theme.spacing(5),
    maxWidth: 600,
  },

  playerWrapper: {
    position: "relative",
    width: "100%",
    height: 220,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      height: 260,
    },
  },

  videoPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

type EventItemProps = {
  title: string;
  date: string;
  details: string;
  videolink: string | null;
};

const EventItem: React.FC<EventItemProps> = ({
  title,
  date,
  details,
  videolink,
}: EventItemProps) => {
  const { container, videoPlayer, playerWrapper } = useStyles();

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

      <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
        {title}
      </Typography>

      {videolink && (
        <div className={playerWrapper}>
          <ReactPlayer
            data-testid="react-player"
            light={true}
            controls={true}
            url={videolink}
            width="100%"
            height="100%"
            className={videoPlayer}
          />
        </div>
      )}
      <Typography component="p" variant="body1" gutterBottom>
        {details}
      </Typography>
    </div>
  );
};

export default EventItem;
