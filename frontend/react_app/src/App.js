import React, { useState, useEffect } from "react";
import Urls from "./Urls";
import Layout from "./components/Layout";
import { connect } from "react-redux";
import * as actions from "./store/authActions";

const style = {
  backgroundColor: "#FAE5BD",
};

function App(props) {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, []);

  useEffect(() => {
    props.user();
  }, []);

  return (
    <div className="App" style={style}>
      <Layout {...props}>
        <Urls {...props} />
      </Layout>
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
