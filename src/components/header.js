import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  orange: {
    "&:hover": {
      background: "#f00",
      border: "2px solid black",
    },
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function Header(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <MenuIcon
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <IconButton />
          </MenuIcon> */}
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6"
            className={classes.title}
          >
            <Route
              render={({ history }) => (
                <p
                  color="inherit"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  LMS
                </p>
              )}
            />
          </Typography>

          {props.authenticated ? (
            <Fragment>
              <Avatar
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className={classes.orange}
              >
                {"I"[0]}
              </Avatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Route
                  render={({ history }) => (
                    <MenuItem
                      color="inherit"
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      home
                    </MenuItem>
                  )}
                />
                <Route
                  render={({ history }) => (
                    <MenuItem
                      color="inherit"
                      onClick={() => {
                        history.push("/account");
                      }}
                    >
                      profile
                    </MenuItem>
                  )}
                />

                <Route
                  render={({ history }) => (
                    <MenuItem
                      color="inherit"
                      onClick={() => {
                        history.push("/signout");
                      }}
                    >
                      Logout
                    </MenuItem>
                  )}
                />
              </Menu>
            </Fragment>
          ) : (
            <Fragment>
              <Route
                render={({ history }) => (
                  <Button
                    color="inherit"
                    type="button"
                    onClick={() => {
                      history.push("/signin");
                      setAnchorEl(null);
                    }}
                  >
                    Login
                  </Button>
                )}
              />
              <Route
                render={({ history }) => (
                  <Button
                    color="inherit"
                    type="button"
                    onClick={() => {
                      history.push("/signup");
                      setAnchorEl(null);
                    }}
                  >
                    Sign Up
                  </Button>
                )}
              />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// renderSignButton() {
//     if (this.props.authenticated) {
//       return (
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/signout">
//             Sign out
//           </NavLink>
//         </li>
//       );
//     } else {
//       return [
//         <li className="nav-item" key="1">
//           <NavLink to="/signin" className="nav-link">
//             Sign in
//           </NavLink>
//         </li>,
//         <li className="nav-item" key="2">
//           <NavLink to="/signup" className="nav-link">
//             Sign Up
//           </NavLink>
//         </li>,
//       ];
//     }
//   }

// rende1r() {
//     return (
//       <nav className="navbar navbar-expand-sm navbar-light bg-light">
//         <NavLink className="navbar-brand" to="/">
//           MERN
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/public">
//                 Public
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/account">
//                 Account
//               </NavLink>
//             </li>
//           </ul>
//           <ul className="navbar-nav">{this.renderSignButton()}</ul>
//         </div>
//       </nav>
//     );
//   }

function mapStateToProps({ auth }) {
  // console.log("auth is ", auth);
  return {
    authenticated: auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
