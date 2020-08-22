import React, { useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Distance, Mass, Force } from "../../generated/graphql";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Characteristic from "../characteristic";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    marginBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    background: "none",

    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },

  infoContainer: {
    flexBasis: 6,
    flexGrow: 2,
    paddingTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
      paddingTop: 0,
    },
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },

  breadcrumbLink: {
    "&:hover": {
      cursor: "pointer",
    },
  },

  imageWrapper: {
    flexBasis: 4,
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "280px",

    objectFit: "cover",

    [theme.breakpoints.only("sm")]: {
      height: 360,
    },

    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
  },

  overviewItem: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.divider}`,

    "&:last-child": {
      border: "none",
    },
  },
}));

type RocketItemProps = {
  data: {
    name: string;
    description: string;
    active: boolean;
    costPerLaunch: number;
    successRate: number;
    wikipedia: string | null;
    firstFlight: string | null;
    boosters: number;
    diameter: Distance | null | undefined;
    height: Distance | null | undefined;
    mass: Mass | null | undefined;
    engine: {
      number: number;
      type: string;
      propellant1: string;
      propellant2: string;
      thrustToWeight: number;
      thrust: {
        seaLevelKN: Force | null | undefined;
        vaccumKN: Force | null | undefined;
      };
    };
  };
};

enum Tabs {
  Description = "description",
  Overview = "overview",
  Engines = "engines",
}

const RocketItem: React.FC<RocketItemProps> = ({ data }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(Tabs.Description);

  let imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Falcon_1_Flight_4_liftoff.jpg/220px-Falcon_1_Flight_4_liftoff.jpg";

  if (data.name.toLowerCase() === "falcon 9")
    imageUrl =
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/in-this-spacex-handout-image-a-falcon-9-rocket-carrying-the-news-photo-1591219555.jpg";
  else if (data.name.toLowerCase() === "falcon heavy")
    imageUrl =
      "https://www.extremetech.com/wp-content/uploads/2018/01/falcon-heavy-test.jpg";
  else if (data.name.toLowerCase() === "starship")
    imageUrl =
      "https://i.insider.com/5f10dfdfaee6a8672a6e0bc3?width=1100&format=jpeg&auto=webp";

  return (
    <Fade in={true} timeout={1000}>
      <Paper className={classes.container}>
        <div className={classes.imageWrapper}>
          <img alt="rocket" src={imageUrl} className={classes.image} />
        </div>
        <div className={classes.infoContainer}>
          <Link
            href={data.wikipedia ? data.wikipedia : "#"}
            color="inherit"
            target="_blank"
          >
            <Typography component="h4" variant="h4" gutterBottom>
              {data.name}
            </Typography>
          </Link>

          <Breadcrumbs
            className={classes.breadcrumbs}
            separator="|"
            aria-label="breadcrumb"
          >
            <Link
              className={classes.breadcrumbLink}
              color={currentTab === Tabs.Description ? "secondary" : "inherit"}
              onClick={() => setCurrentTab(Tabs.Description)}
            >
              DESCRIPTION
            </Link>
            <Link
              className={classes.breadcrumbLink}
              color={currentTab === Tabs.Overview ? "secondary" : "inherit"}
              onClick={() => setCurrentTab(Tabs.Overview)}
            >
              OVERVIEW
            </Link>
            <Link
              className={classes.breadcrumbLink}
              color={currentTab === Tabs.Engines ? "secondary" : "inherit"}
              onClick={() => setCurrentTab(Tabs.Engines)}
            >
              ENGINES
            </Link>
          </Breadcrumbs>

          <div>
            {currentTab === Tabs.Description && (
              <Fade in={true} timeout={1000}>
                <div style={{ minHeight: 245 }}>
                  <Typography component="p" variant="body1" gutterBottom>
                    {data.description}
                  </Typography>
                  <br />
                  <Grid container>
                    <Characteristic
                      label="First flight"
                      value={moment(data.firstFlight).format("MMMM Do, YYYY")}
                    />
                    <Characteristic
                      label="Active"
                      value={data.active ? "Yes" : "No"}
                    />
                  </Grid>
                </div>
              </Fade>
            )}

            {currentTab === Tabs.Overview && (
              <Fade in={true} timeout={1000}>
                <Grid container>
                  <Characteristic
                    label="Height"
                    value={data.height?.meters ? data.height.meters : "N/A"}
                    unit="m"
                  />
                  <Characteristic
                    label="Diameter"
                    value={data.diameter?.meters ? data.diameter.meters : "N/A"}
                    unit="m"
                  />
                  <Characteristic
                    label="Mass"
                    value={
                      data.mass?.kg ? data.mass.kg.toLocaleString() : "N/A"
                    }
                    unit="kg"
                  />
                  <Characteristic
                    label="Cost per launch"
                    value={"$ " + data.costPerLaunch.toLocaleString()}
                  />
                  <Characteristic
                    label="Success rate"
                    value={data.successRate}
                    unit="%"
                  />
                  <Characteristic label="Boosters" value={data.boosters} />
                </Grid>
              </Fade>
            )}

            {currentTab === Tabs.Engines && (
              <Fade in={true} timeout={1000}>
                <Grid container>
                  <Characteristic
                    label="Number of engines"
                    value={data.engine.number}
                  />
                  <Characteristic label="Type" value={data.engine.type} />
                  <Characteristic
                    label="Propellant 1"
                    value={data.engine.propellant1}
                  />
                  <Characteristic
                    label="Propellant 2"
                    value={data.engine.propellant2}
                  />
                  <Characteristic
                    label="Sea-level Thrust"
                    value={
                      data.engine.thrust.seaLevelKN?.kN
                        ? data.engine.thrust.seaLevelKN.kN.toLocaleString()
                        : "N/A"
                    }
                    unit="kN"
                  />
                  <Characteristic
                    label="Vaccum Thrust"
                    value={
                      data.engine.thrust.vaccumKN?.kN
                        ? data.engine.thrust.vaccumKN.kN.toLocaleString()
                        : "N/A"
                    }
                    unit="kN"
                  />
                </Grid>
              </Fade>
            )}
          </div>
        </div>
      </Paper>
    </Fade>
  );
};

export default RocketItem;
