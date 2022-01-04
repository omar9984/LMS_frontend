import React, { useEffect, useState } from "react";
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
import axios from "axios";

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

export default function Question(props) {
  const classes = useStyles();
  const [question, setQuestion] = React.useState(props.question);

  const fetch_question = async () => {
    let question_response = await axios.get("/course/get_many_questions/", {
      params: {
        ids: question._id,
      },
      headers: {
        Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
      },
    });
    let new_question = question_response.data[0];
    // console.log("fetched question is ", new_question);
    setQuestion(new_question);
  };
  const add_reply = async (e) => {
    e.preventDefault();
    let reply = document.getElementById("txtReply").value;

    let r = await axios.post(
      `/course/add_reply/${question._id}`,
      {
        reply: reply,
      },
      {
        headers: {
          Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
        },
      }
    );
    fetch_question();
    console.log("reply is ", reply);
  };
  useEffect(() => {
    // fetch_question();
  }, []);
  return (
    <Grid
      style={{
        boxShadow: "0px 0px 3px 3px rgba(12,59,255,0.99)",
        borderRadius: "8px",
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
            id="txtReply"
            label="reply"
            placeholder="enter your reply"
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
            onClick={add_reply}
            style={{ height: "3.8em" }}
            color="primary"
            variant="outlined"
          >
            add
          </Button>
        </Grid>
      </Grid>

      <List className={classes.response}>
        {/* TODO: add this after you finish question.replies */}
        {question.replies.map((reply, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                  >
                    {reply.author.firstName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={reply.description}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {reply.author.firstName + " " + reply.author.lastName}
                      </Typography>
                      {" " + reply.author.email}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Grid>
  );
}
