import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRocketsQuery } from "../../generated/graphql";

import RocketItem from "./rocketItem";
import { Container } from "@material-ui/core";
import Loading from "../loading";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(4),
  },
}));

const Rockets = () => {
  const { loading, error, data } = useRocketsQuery();
  const { heading } = useStyles();

  if (error) return <p>error</p>;

  return (
    <Container maxWidth="md">
      <Typography
        className={heading}
        component="h3"
        variant="h3"
        align="center"
      >
        Rockets
      </Typography>
      {loading && <Loading />}
      {data?.rockets &&
        data.rockets.map((rocket, i) => (
          <RocketItem
            key={i}
            data={{
              name: rocket?.name ? rocket.name : "N/A",
              description: rocket?.description ? rocket.description : "N/A",
              active: rocket?.active ? rocket.active : false,
              costPerLaunch: rocket?.cost_per_launch
                ? rocket.cost_per_launch
                : 0,
              successRate: rocket?.success_rate_pct
                ? rocket.success_rate_pct
                : 0,
              wikipedia: rocket?.wikipedia ? rocket.wikipedia : null,
              firstFlight: rocket?.first_flight ? rocket.first_flight : null,
              boosters: rocket?.boosters ? rocket.boosters : 0,
              diameter: rocket?.diameter,
              height: rocket?.height,
              mass: rocket?.mass,
              engine: {
                number: rocket?.engines?.number ? rocket.engines.number : 0,
                type: rocket?.engines?.type ? rocket.engines.type : "N/A",
                propellant1: rocket?.engines?.propellant_1
                  ? rocket.engines.propellant_1
                  : "N/A",
                propellant2: rocket?.engines?.propellant_2
                  ? rocket.engines.propellant_2
                  : "N/A",
                thrustToWeight: rocket?.engines?.thrust_to_weight
                  ? rocket.engines.thrust_to_weight
                  : 0,
                thrust: {
                  seaLevelKN: rocket?.engines?.thrust_sea_level,
                  vaccumKN: rocket?.engines?.thrust_vacuum,
                },
              },
            }}
          />
        ))}
    </Container>
  );
};

export default Rockets;
