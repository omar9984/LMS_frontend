import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import QuestionForm from "./QuestionForm";
import Question from "./Question";
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

  inline: {
    display: "inline",
  },
}));
const temp_questions = [
  {
    title: "hello",
    description: "hello description",
    responses: [],
  },
];
export default function QATab({ course }) {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState([]);
  const fetch_questions = async () => {};
  useState(() => {
    setQuestions(temp_questions);
  }, []);
  return (
    <div>
      <QuestionForm course={course} />
      <div>
        {questions.map((question) => {
          return <Question question={question} />;
        })}
      </div>
    </div>
  );
}
