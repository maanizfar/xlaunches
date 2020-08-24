import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useCompanyInfoQuery } from "../../generated/graphql";
import Characteristic from "../characteristic";
import Link from "@material-ui/core/Link";
import Loading from "../loading";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(4),
  },

  row: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },

  details: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(4),
    },
  },

  tableContainer: {
    width: "100%",

    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },

    [theme.breakpoints.up("sm")]: {
      minWidth: 300,
    },
  },
}));

const About = () => {
  const { heading, row, details, tableContainer } = useStyles();
  const { loading, error, data } = useCompanyInfoQuery();

  if (error) return <p>error</p>;

  const headquarters = data?.company?.headquarters
    ? data.company.headquarters.address +
      ", " +
      data.company.headquarters.city +
      ", " +
      data.company.headquarters.state
    : "N/A";

  return (
    <div>
      <Typography
        className={heading}
        component="h4"
        variant="h4"
        align="center"
      >
        About This Website
      </Typography>
      <Container maxWidth="md" className={row}>
        <Typography
          component="p"
          variant="body1"
          align="justify"
          className={details}
        >
          Xlaunches is an open source web application for viewing future and
          past SpaceX launches. It has a countdown timer that shows the time
          before the next launch, and information about each previous launch and
          event.
        </Typography>

        <div className={tableContainer}>
          <Characteristic
            label="Created by"
            value="Salman Zafar"
            link="https://salman.codes"
          />
          <Characteristic
            label="Data provided by"
            value="https://api.spacex.land"
            link="https://api.spacex.land"
          />
          <Characteristic
            label="Technologies used"
            value="React, GraphQL, ApolloClient & Material-UI"
          />
        </div>
      </Container>

      {loading && <Loading />}

      {data && (
        <>
          <Typography
            className={heading}
            component="h4"
            variant="h4"
            align="center"
          >
            About{" "}
            {data.company?.links?.website && (
              <Link
                href={data.company.links.website}
                color="secondary"
                target="_blank"
              >
                SpaceX
              </Link>
            )}
          </Typography>
          <Container maxWidth="md" className={row}>
            <Typography
              component="p"
              variant="body1"
              align="justify"
              className={details}
            >
              {data.company?.summary ? data.company.summary : "N/A"}
            </Typography>

            <div className={tableContainer}>
              <Characteristic label="Headquaters" value={headquarters} />
              <Characteristic
                label="Founded"
                value={data.company?.founded ? data.company.founded : "N/A"}
              />
              <Characteristic
                label="Founder / CEO / CTO"
                value={data.company?.ceo ? data.company.ceo : "N/A"}
                link={
                  data.company?.links?.elon_twitter
                    ? data.company.links.elon_twitter
                    : "#"
                }
              />

              <Characteristic
                label="COO"
                value={data.company?.coo ? data.company.coo : "N/A"}
              />
              <Characteristic
                label="CTO Propulsion"
                value={
                  data.company?.cto_propulsion
                    ? data.company.cto_propulsion
                    : "N/A"
                }
              />
              <Characteristic
                label="Employees"
                value={data.company?.employees ? data.company.employees : "N/A"}
              />
              <Characteristic
                label="Valuation"
                value={
                  data.company?.valuation
                    ? "$ " + data.company.valuation.toLocaleString()
                    : "N/A"
                }
              />
            </div>
          </Container>
        </>
      )}

      <Container maxWidth="md">
        <Typography
          component="p"
          variant="body1"
          align="center"
          color="textSecondary"
          style={{ marginTop: "6rem" }}
          gutterBottom
        >
          DISCLAIMER: The creator and maintainer of this website has no
          affiliation with SpaceX. The content herein should be considered for
          educational purposes only.
        </Typography>
      </Container>
    </div>
  );
};

export default About;
