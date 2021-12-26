import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MediaCard from "../cards/MediaCard";
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
    axios
      .get(`/user/profile`, {
        headers: {
          Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
        },
      })
      .then((r) => {
        setProfile(r.data);
      });
    setCourses(tempCourses);
  }, []);
  return (
    <div>
    <h1>instructor</h1>
      {profile && <h1>hello {profile.firstName}</h1>}
      <div className={classes.root}>
        <Grid container spacing={3}>
          {courses.map((course) => {
            return (
              <Grid item xs={6} sm={3}>
                <MediaCard id={course.id} key={course.id} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
