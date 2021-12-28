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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddCourseForm from "../course/AddCourseForm";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { TextField } from "@material-ui/core";
import warning from "react-redux/lib/utils/warning";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2),
  },
  floatingFab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
// Dialog

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InstructorHome() {
  const classes = useStyles();
  const [txtErrorMessage, settxtErrorMessage] = React.useState("");
  const [txtError, settxtError] = React.useState("");
  const [profile, setProfile] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  // Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        console.log("couldn't connect to backend");
      }
    })();
  }, []);

  const add_course = async () => {
    let txtNameElement = document.getElementById("txtName");
    try {
      let r = await axios.post(
        `/instructor/add_course`,
        {
          name: txtNameElement.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        }
      );
      console.log("response to create is ", r.data);
    } catch (error) {
      console.log(error);
      settxtErrorMessage("this name already exists");
      // document.getElementById("txtName").error = true;
    }
    console.log("mido ", txtNameElement.value);
  };

  return (
    <div>
      <h1>instructor</h1>
      {profile && <h1>hello {profile.firstName}</h1>}
      <div className={classes.root}>
        <Grid container spacing={3}>
          {courses.map((course, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} spacing={3}>
                <CourseCard course={course} id={course.id} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create Course
            </Typography>
            <Button autoFocus color="inherit" onClick={add_course}>
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          style={{ paddingTop: "120px" }}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            style={{ paddingTop: "150px" }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography style={{ marginRight: "10px" }}>Course Name</Typography>
            <TextField
              id="txtName"
              name="name"
              label="Course Name (unique)"
              defaultValue="computer-systems-123"
              variant="outlined"
              error={txtError === "error"}
              helperText={txtError === "error" ? txtErrorMessage : " "}
            />
          </Grid>
        </Grid>
      </Dialog>
      <Fab
        onClick={handleClickOpen}
        className={classes.floatingFab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
