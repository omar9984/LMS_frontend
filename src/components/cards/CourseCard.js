import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Route } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 245,
  },
});

export default function CourseCard({ profile, course, onUpdate }) {
  const { _id, name } = course;
  const classes = useStyles();
  if (!onUpdate) {
    onUpdate = () => {};
  }
  const remove_course = async () => {
    // TODO courses aren't removed login with instructor omar@test.com to check that
    console.log("remove a course", localStorage.getItem("auth_jwt_token"));
    try {
      let url = `/learner/leave_course/${_id}`;
      if (profile.type.toLowerCase() == "instructor") {
        url = `/instructor/remove_course/${_id}`;
      }
      let r = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        }
      );
      onUpdate();
    } catch (error) {
      console.log("error occured", error);
    }
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/statics/laptop.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Route
          render={({ history }) => (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                history.push("/course/" + _id);
              }}
            >
              View
            </Button>
          )}
        />
        {profile.type.toLowerCase() == "instructor" ? (
          <Button size="small" color="primary" onClick={remove_course}>
            remove
          </Button>
        ) : (
          <Button size="small" color="primary" onClick={remove_course}>
            UnEnroll
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
