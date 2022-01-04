import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import QuestionForm from "./QuestionForm";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Question from "./Question";
import axios from "axios";
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

  txtField: {
    marginBottom: "10px",
  },
}));
const temp_questions = [
  {
    title: "maths questions ? ",
    description: "please tell me what is the value of pi ?",
    replies: [],
  },
  {
    title: "science questions ? ",
    description: "please tell me what is the value of boltzman constant ?",
    replies: [],
  },
];
export default function QATab({ course }) {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState([]);

  const fetch_questions = async (question_add = false) => {
    if (question_add || course.questions.length != 0) {
      try {
        console.log("trying to refetch the questions before ", questions);

        let questions_response = await axios.get(
          "/course/get_many_questions/",
          {
            params: {
              ids: course.questions.join(","),
            },
            headers: {
              Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
            },
          }
        );
        let new_questions = questions_response.data;
        console.log("questions_response ", questions_response);
        console.log("fetched questions are ", new_questions);
        setQuestions(new_questions);
      } catch (error) {
        console.log("error is ", error);
        alert("error occured while fetching the questions");
      }
    }
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    console.log("question form");
    console.log("course is ", course);
    let title = document.getElementById("txtTitle").value;
    let description = document.getElementById("txtQuestion").value;

    console.log("title , description ", { title, description });
    try {
      // TODO : uncomment the following code when fetch questoins work in the QA tab
      let r = await axios.post(
        `/course/add_question/${course._id}`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        }
      );
      let new_question = r.data;
      console.log(" QuestionForm new Question is ", new_question);
      setQuestions([...questions, new_question]);
      document.getElementById("txtTitle").value = "";
      document.getElementById("txtQuestion").value = "";
    } catch (error) {
      console.log(error);
      alert("an error prevented adding this question");
    }
  };

  useEffect(() => {
    fetch_questions();
  }, []);
  return (
    <div>
      <div>
        <form
          style={{
            padding: "10px",
            boxShadow: "0px 0px 3px 3px rgba(12,59,255,0.99)",
          }}
          onSubmit={submitQuestion}
        >
          <div>
            <TextField
              className={classes.txtField}
              id="txtTitle"
              fullWidth
              placeholder="enter question title"
              required
            />
          </div>
          <div>
            <TextField
              required
              className={classes.txtField}
              rows={5}
              id="txtQuestion"
              fullWidth
              multiline
              placeholder="describe your question"
            />
          </div>
          <div>
            <Button type="submit" variant="outlined">
              add
            </Button>
          </div>
        </form>
      </div>
      <hr />
      <div>
        {questions
          .slice(0)
          .reverse()
          .map((question) => {
            return <Question question={question} />;
          })}
      </div>
    </div>
  );
}
