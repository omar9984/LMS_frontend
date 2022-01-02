import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserList({ users, onUpdate }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  useEffect(() => {
    console.log("users", users);
  }, []);

  return (
    <List
      subheader={<ListSubheader>change learner to instructor</ListSubheader>}
      className={classes.root}
    >
      {users.map((user, index) => {
        return (
          <ListItem>
            <ListItemIcon>
              <Avatar
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  console.log("don't click here");
                }}
                className={classes.orange}
              >
                {user.firstName[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary={user.email} />

            {user.type.toLowerCase() != "admin" ? (
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={() => onUpdate(user._id)}
                  checked={user.type.toLowerCase() == "instructor"}
                  inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
                />
              </ListItemSecondaryAction>
            ) : (
              <p>admin</p>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
