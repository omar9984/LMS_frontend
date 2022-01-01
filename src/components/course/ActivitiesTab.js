import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ActivitiesTab({ people }) {
  const classes = useStyles();
  console.log("activites are is ", people.learners);
  return (
    <List className={classes.root}>
      {people.learners && people.learners.length != 0 ? (
        people.learners.map((student, index) => {
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => {
                    console.log("todo");
                  }}
                  className={classes.orange}
                >
                  {student.firstName[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={student.firstName + " " + student.lastName}
                secondary="Jan 9, 2014"
              />
            </ListItem>
          );
        })
      ) : (
        <Typography>No people here</Typography>
      )}
    </List>
  );
}
