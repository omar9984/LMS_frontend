import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Grade } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "36ch",
    borderTop: "2px solid black",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "10px",
    paddingBottom: "10px",
    marginTop: "100px",
  },
  response: {
    width: "100%",
    minWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Question({ question }) {
  const classes = useStyles();

  return (
    <Grid
      style={{
        boxShadow: "0px 0px 3px 3px rgba(12,59,255,0.99)",

        padding: "10px",
        marginTop: "10px",
      }}
      xs={12}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <div style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
        <div
          style={{
            fontSize: "1.2em",
            marginBottom: "5px",
            borderBottom: "1px solid black",
          }}
        >
          {question.title}
        </div>

        <div
          style={{
            minHeight: "6em",
            marginBottom: "5px",
            borderBottom: "1px solid black",
          }}
        >
          {question.description}
        </div>
      </div>

      <Grid container>
        <Grid xs={12} md={8}>
          <TextField
            fullWidth
            id="txtResponse"
            label="response"
            placeholder="enter your response"
            variant="filled"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              console.log("add reply");
            }}
            style={{ height: "3.8em" }}
            color="secondary"
            variant="outlined"
          >
            add
          </Button>
        </Grid>
      </Grid>

      <List className={classes.response}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Grid>
  );
}
