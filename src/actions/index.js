import axios from "axios";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "./types";
const ROOT_URL = process.env.API_URI || "http://localhost:8000";

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem("auth_jwt_token")) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("auth_jwt_token");
}
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export function signUserIn(data) {
  return function (dispatch) {
    // Submit email/password to server
    console.log("now signUserIn");

    axios
      .post(`/login`, data)
      .then((res) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("auth_jwt_token", "Bearer " + res.data.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("auth_jwt_token");
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: AUTH_ERROR, payload: "Server Error, try later." });
      });
  };
}

export function signUserUp(userObj) {
  return function (dispatch) {
    // Submit email/password to server
    console.log(userObj);
    axios
      .post(`/signup`, userObj)
      .then((res) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("auth_jwt_token", "Bearer " + res.data.token);
        window.location = "/";
        axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("auth_jwt_token");
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: AUTH_ERROR, payload: "Server Error, try later." });
      });
  };
}

export function signUserOut() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    localStorage.removeItem("auth_jwt_token");
  };
}

const request = axios;
export { request };
