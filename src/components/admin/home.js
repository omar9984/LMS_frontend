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
import { createTheme } from "@material-ui/core/styles";
import UserList from "./UserList";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ArrowleftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));
let tempCourses = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
export default function AdminHome() {
  const classes = useStyles();
  const [profile, setProfile] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState("");
  const fetchProfile = async () => {
    axios
      .get(`/user/profile`, {
        headers: {
          Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
        },
      })
      .then((r) => {
        setProfile(r.data);
      });
  };
  const fetchUsers = async () => {
    console.log("hello is offset , limit , email ", offset, limit, searchTerm);
    let searchBy = document.getElementById("boxSearch").value;
    let users_response = await axios.get(`/user/search`, {
      params: {
        offset: offset,
        limit: limit,
        email: searchBy,
      },
      headers: {
        Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
      },
    });

    let users = users_response.data.users;
    console.log("fetched users are ", users);
    setUsers(users);
  };

  useEffect(() => {
    fetchProfile();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [limit, offset]);

  const toggleUser = async (id) => {
    let new_type = "";
    let new_users = users.map((user) => {
      if (user._id == id) {
        // send the backend request
        new_type = user.type == "instructor" ? "learner" : "instructor";

        return {
          ...user,
          type: new_type,
        };
      } else {
        return user;
      }
    });
    try {
      let r = await axios.put(
        `/user/change_type`,
        {
          id: id,
          type: new_type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        }
      );
      console.log("response to create is ", r.data);
    } catch (error) {
      alert("could not change user type");
      console.log("error occured", error);
    }

    console.log("new users ", new_users);
    setUsers(new_users);
  };
  return (
    <div>
      <h3 style={{"text-align":"center", color:"CornflowerBlue"}}>Admin profile</h3>
      {profile && <h3 style={{"text-align":"right", color:"CornflowerBlue"}}>hello {profile.firstName}</h3>}
      <Grid container spacing={3}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
          item
          xs={12}
          md={8}
        >
          <TextField
            id="boxSearch"
            label="search"
            style={{ margin: 8, height: "4.5em" }}
            placeholder="enter the user's email"
            helperText="search by email!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(value) => setSearchTerm(value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              fetchUsers();
            }}
            style={{ height: "4.5em" }}
            color="secondary"
            variant="outlined"
          >
            find
          </Button>
        </Grid>
      </Grid>
      {users.length == 0 ? (
        <h1>empty result set</h1>
      ) : (
        <UserList onUpdate={toggleUser} users={users} />
      )}
      <Grid
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        container
      >
        <IconButton
          disabled={offset == 0}
          aria-label="delete"
          onClick={() => {
            setOffset(offset - limit);
          }}
        >
          <ArrowleftIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          disabled={users.length == 0}
          color="primary"
          onClick={() => {
            setOffset(offset + limit);
          }}
        >
          <ArrowRightIcon />
        </IconButton>
      </Grid>
    </div>
  );
}
