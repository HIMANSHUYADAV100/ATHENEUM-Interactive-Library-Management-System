import axios from "axios";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  USER_LOADING,
  USER_LOADED,
} from "./ActionTypes";
import { API_SERVER, SESSION_DURATION } from "../settings";

// ########################################################
// ########################################################
// Contains Auth Action Functions. These perform two kinds of things:
// 1) Return Action Objects
// a) Simply Return an Action Object
// b) Perform some action and then return an Action Objet
// 2) Return A Dispatch(Action) combination
// a)Perform an action then return a Dispatch(Action) combination.
// This Dispatch(Action) could be used by some other function to dispatch action to the store
// ########################################################
// ########################################################

// ########################################################
// ########################################################
// Auth Action Functions returning Action Objects
// ########################################################
// ########################################################

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get(`${API_SERVER}/api/auth/user`, config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      //dispatch actions for errors
      // dispatch(returnErrors(err.response.data, err.response.status));
      // dispatch({ type: AUTH_ERROR });
      console.log(err);
    });
};

export const authLogout = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    localStorage.removeItem("expirationDate");
  } else {
    axios
      .post(
        `${API_SERVER}/api/auth/logout/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: AUTH_LOGOUT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }
};

// ########################################################
// ########################################################
// Auth Action Functions returning A Dispatch(Action) combination after performing some action
// ########################################################
// ########################################################

// This sets a timer, which would automatically logout the user after a specified time
export const authCheckTimeout = (expirationTime) => {
  return () => {
    setTimeout(() => {
      authLogout();
    }, expirationTime);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${API_SERVER}/api/auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(
          new Date().getTime() + SESSION_DURATION
        );
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(authCheckTimeout(SESSION_DURATION));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          authCheckTimeout(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
};
