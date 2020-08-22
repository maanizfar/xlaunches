import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Timeline as MDTimeline } from "@material-ui/lab/";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.only("sm")]: {
      flexGrow: 5,
    },
  },

  oppositeContent: {
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

type TimelineProps = {
  data: {
    time: any;
    dotColor: string;
    content: JSX.Element;
  }[];
};

const Timeline: React.FC<TimelineProps> = ({ data }: TimelineProps) => {
  const { content, oppositeContent } = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <MDTimeline
        align={smallScreen ? "left" : "alternate"}
        data-testid="timeline"
      >
        {data?.map((entry, i) => (
          <Fade timeout={1000} in={true} key={i}>
            <TimelineItem>
              <TimelineOppositeContent classes={{ root: oppositeContent }}>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ margin: 0 }}
                  color="secondary"
                >
                  {moment(entry.time).format("MMMM Do, YYYY")}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot
                  data-testid="dot"
                  style={{
                    backgroundColor: entry.dotColor,
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                classes={{
                  root: content,
                }}
              >
                {entry.content}
              </TimelineContent>
            </TimelineItem>
          </Fade>
        ))}
      </MDTimeline>
    </Container>
  );
};

export default Timeline;
