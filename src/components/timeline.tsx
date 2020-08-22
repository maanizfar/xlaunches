import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Timeline as MDTimeline } from "@material-ui/lab/";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 0,
    flexGrow: 2.5,

    [theme.breakpoints.up("md")]: {
      flexGrow: 1.6,
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
  const { content } = useStyles();

  return (
    <MDTimeline align="left" data-testid="timeline">
      {data?.map((entry, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent>
            <Typography variant="body1" component="p" style={{ margin: 0 }}>
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
      ))}
    </MDTimeline>
  );
};

export default Timeline;
