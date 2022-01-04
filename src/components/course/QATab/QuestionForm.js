import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  txtField: {
    marginBottom: "10px",
  },
  root: {
    "& > *": theme.spacing(1),
  },
}));
export default function QuestionForm({ course, onUpdate }) {
  useEffect(() => {
    console.log("on Update is ", onUpdate);
    let q = {
      _id: "61d4321715c98fdba7f8d478",
      title: "consultation-test",
      description: "regarding the project when will the submission be ? ",
      author: "61c2cfe162f9fd89c08334fd",
      course: "61c8960f69822d2245463fd4",
      createdAt: "2022-01-04T11:40:07.127Z",
      replies: [],
      __v: 0,
    };
    onUpdate(q);
  }, []);
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
      onUpdate(new_questions);
    } catch (error) {
      console.log(error);
      alert("an error prevented adding this question");
    }
  };
  const classes = useStyles();
  return (
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
  );
}
