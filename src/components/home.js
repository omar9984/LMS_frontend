import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CircularLoading from "./common/CircularLoading";
import LandingPage from "./general/home";
import InstructorHome from "./instructor/home";
import LearnerHome from "./learner/home";
import AdminHome from "./admin/home";
import { newProfile } from "../actions";
import { connect } from "react-redux";


const STATUS = {
  CONNECTED: 1,
  LOADING: 2,
  DISCONNECTED: 3,
};

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
const Home = (props) =>  {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [profile, setProfile] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS.LOADING);
  useEffect(() => {
    axios
      .get(`/user/profile`, {
        headers: {
          Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
        },
      })
      .then((r) => {

        console.log("profile is ", r.data);
        setProfile(r.data);
        props.newProfile(r.data);
        setStatus(STATUS.CONNECTED);
      })
      .catch((err) => {
        console.log("error is ", err);
        setStatus(STATUS.DISCONNECTED);
      });
    setCourses(tempCourses);
  }, []);
  switch (status) {
    case STATUS.CONNECTED:
      switch (profile.type) {
        case "learner":
          return <Redirect to="/learner/home" />;
        case "instructor":
          return <Redirect to="/instructor/home" />;
        case "admin":
          return <Redirect to="/admin/home" />;
        default:
          return "<h1>unknown user type database compromised </h1>";
      }
    case STATUS.DISCONNECTED:
      return <Redirect to="/lms" />;
    default:
      return <CircularLoading />;
  }
}
export default connect(null, { newProfile })(Home);
