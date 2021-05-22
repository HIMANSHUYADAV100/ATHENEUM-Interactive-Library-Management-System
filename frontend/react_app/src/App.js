import React, { useEffect } from "react";
import TopBar from "./components/TopBar";

import Login from "./components/Login";
import Home from "./components/Home";
import PasswordUpdate from "./components/PasswordUpdate";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import { connect } from "react-redux";
import * as actions from "./Action&Reducer/authActions";

const style = {
  backgroundColor: "#FAE5BD",
};

function App(props) {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    props.setAuthenticatedIfRequired();// eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.user();// eslint-disable-next-line
  }, []);

  return (
    <div className="App" style={style}>
      <BrowserRouter>
        <TopBar {...props} />
        <Switch>g
          <div>
            <Route exact path="/login/">
              {" "}
              <Login {...props} />
            </Route>

            <PrivateRoute
              exact
              path="/update_password/"
              isAuthenticated={props.isAuthenticated}
            >
              <PasswordUpdate {...props} />
            </PrivateRoute>

            <PrivateRoute
              exact
              path="/"
              isAuthenticated={props.isAuthenticated}
            >
              <Home {...props} />
            </PrivateRoute>
          </div>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      state.auth.token !== null && typeof state.auth.token !== "undefined",
    token: state.auth.token,
    current_user: state.auth.user,
  };
};

//This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.authLogout()),
    user: () => dispatch(actions.loadUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
