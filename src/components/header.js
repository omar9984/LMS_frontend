import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
}));

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          {props.authenticated ? (
            <Fragment>
              <Route
                render={({ history }) => (
                  <Button
                    color="inherit"
                    type="button"
                    onClick={() => {
                      history.push("/signout");
                    }}
                  >
                    Logout
                  </Button>
                )}
              />
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
  return {
    authenticated: auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
