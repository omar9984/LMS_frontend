import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  txtField: {
    marginBottom: "10px",
  },
  root: {
    "& > *": theme.spacing(1),
  },
}));
export default function QuestionForm({ course, onUpdate }) {
  const submitQuestion = async (e) => {
    e.preventDefault();
    console.log("question form");
    console.log("course is ", course);
    alert("you are submitting" + description);
    let title = document.getElementById("txtTitle").value;
    let description = document.getElementById("txtQuestion").value;
    console.log("title , description ", { title, description });
    try {
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
