import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PeopleTab from "./PeopleTab";
import { useParams } from "react-router-dom";
import Axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabButton: {
    "&:hover": {
      color: "#e040fb",
      textDecoration: "none",
    },
  },
}));

export default function Course() {
  const { id } = useParams();
  console.log(id);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [course, setCourse] = React.useState({});
  const [people, setPeople] = React.useState({ learners: [] });
  const [QA, setQA] = React.useState({});
  const [activities, setActivities] = React.useState({});

  useEffect(() => {
    (async () => {
      // get the courses and set the courses variable
      let course_response = await Axios.get("/course/get/" + id, {
        headers: {
          Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
        },
      });
      let course = course_response.data;
      setCourse(course);
      console.log("course is ", course_response);
      // get all the studs registered in the course
      if (course.learners.length > 0) {
        let learners_respons = await Axios.get("/learner/get_many/", {
          params: {
            ids: course.learners.join(","),
          },
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        });
        let learners = learners_respons.data;
        console.log(learners);
        setPeople({ ...people, learners: learners });
      }

      // get all the Questions in the course
    })();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            className={classes.tabButton}
            label="Activities"
            href="/drafts"
            {...a11yProps(0)}
          />
          <LinkTab
            className={classes.tabButton}
            label="QA"
            href="/trash"
            {...a11yProps(1)}
          />
          <LinkTab
            className={classes.tabButton}
            label="People"
            href="/spam"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      {/* this is the Activities Tab */}
      <TabPanel value={value} index={0}>
        Page One
      </TabPanel>
      {/* this is the QA Tab */}

      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>

      {/* this is the People's Tab */}
      <TabPanel value={value} index={2}>
        <PeopleTab people={people} />
      </TabPanel>
    </div>
  );
}
