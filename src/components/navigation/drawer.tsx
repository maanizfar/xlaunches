import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import routes from "../../routes";

import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
  },
}));

type DrawerProps = {
  open: boolean;
  onClickHandler: () => void;
};

const RightDrawer: React.FunctionComponent<DrawerProps> = ({
  open,
  onClickHandler,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClick={onClickHandler}
    >
      <List>
        {routes.map(({ name, path }) => (
          <div key={name}>
            <ListItem button onClick={() => navigate(path)}>
              <ListItemText primary={name} />
            </ListItem>
            {name === "Home" && <Divider />}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default RightDrawer;
