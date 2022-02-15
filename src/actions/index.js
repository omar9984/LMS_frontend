import axios from "axios";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_USER_PROFILE } from "./types";
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
    (async()=>{

      try {
        let res = await axios
        .post(`/login`, data);

        console.log("login the user")
        dispatch({ type: AUTH_USER });
        localStorage.setItem("auth_jwt_token", "Bearer " + res.data.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("auth_jwt_token");
        dispatch({ type: AUTH_USER });


        let profile_response = await axios.get("/user/profile/" , {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        });
        let profile = profile_response.data;
        console.log("profile fetched is ", profile)
        await dispatch({ type: GET_USER_PROFILE, payload:profile });



        window.location = "/";
      } catch (error) {
        console.log(error);
        dispatch({ type: AUTH_ERROR, payload: "Server Error, try later." });
      }
    })();
   
  };
}

export function signUserUp(userObj) {
  return function (dispatch) {
    // Submit email/password to server
    (async()=>{
      try {
        let res = axios.post(`/signup`, userObj);
        console.log("dispatched action is ",{ type: AUTH_USER, payload:{user:userObj} })
        dispatch({ type: AUTH_USER});
        localStorage.setItem("auth_jwt_token", "Bearer " + res.data.token);

        let profile_response = await axios.get("/user/profile/" , {
          headers: {
            Authorization: localStorage.getItem("auth_jwt_token"), //the token is a variable which holds the token
          },
        });
        let profile = profile_response.data;
        dispatch({ type: GET_USER_PROFILE, payload:profile });

        window.location = "/";
        axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("auth_jwt_token");


      } catch (error) {
        console.log(error);
        dispatch({ type: AUTH_ERROR, payload: "Server Error, try later." });
      } 
    })()
    console.log(userObj);
    
  };
}

export function signUserOut() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    localStorage.removeItem("auth_jwt_token");
  };
}
export function newProfile(profile) {
  return function (dispatch) {
    dispatch({ type: GET_USER_PROFILE, payload:profile });

  }
}
const request = axios;
export { request };
