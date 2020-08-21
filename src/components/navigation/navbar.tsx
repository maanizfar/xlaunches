import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import routes from "../../routes";

import NavLink from "./navLink";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",

    padding: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  links: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    color: theme.palette.primary.contrastText,
  },
  rightContainer: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 80,
    },
  },
}));

type NavbarProps = {
  onMenuClickHandler: () => void;
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  onMenuClickHandler,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar className={classes.container}>
          <Link to="/">
            <img src="images/logo192.png" alt="logo" width="240px" />
          </Link>

          <div className={classes.rightContainer}>
            <div className={classes.links}>
              {routes.map(({ name, path }, i) => (
                <NavLink key={i} name={name} to={path} end={path === "/"} />
              ))}
            </div>

            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                edge="end"
                aria-label="menu"
                onClick={onMenuClickHandler}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Hidden>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
