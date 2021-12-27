import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CourseCard from "../cards/CourseCard";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
let tempCourses = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
export default function InstructorHome() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [profile, setProfile] = React.useState({});
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    (async () => {
      try {
        let r = await axios.get(`/user/profile`, {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        });

        await setProfile(r.data);
        // console.log("profile ", r.data);
        let courses_response = await axios.get(`/course/get_many`, {
          params: {
            ids: r.data.courses.join(","),
          },

          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        });

        setCourses(courses_response.data);
        console.log(courses_response.data);
        console.log("hello async");
      } catch (error) {
        console.log(error);
        console.log("couldn't connect to backend  ");
      }
    })();
  }, []);
  return (
    <div>
      <h1>instructor</h1>
      {profile && <h1>hello {profile.firstName}</h1>}
      <div className={classes.root}>
        <Grid container spacing={3}>
          {courses.map((course, index) => {
            return (
              <Grid item xs={6} sm={3}>
                <CourseCard course={course} id={course.id} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
