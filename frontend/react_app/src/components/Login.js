import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../store/authActions";

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setuserName] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  React.useEffect(() => {
    if (props.isAuthenticated) {
      history.replace(from);
    }
  });

  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case "username":
        setuserName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAuth(username, password);
  };

  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
        <div style={{ display: "flex", overflow: "hidden", padding: "2vw" }}>
          <div
            style={{
              marginLeft: "2vw",
              justifyContent: "center",
              padding: "3vw",
              width: "500px",
              minWidth: "400px",
              height: "80vh",
              backgroundColor: "white",
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0px 0px 34px -6px rgba(220, 220, 220, 0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* login signup */}
            <Typography
              component="h1"
              style={{ fontSize: "64px", marginLeft: "20%", fontFamily: "NTR" }}
              variant="h5"
            >
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="UserName"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleFormFieldChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFormFieldChange}
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                <span>Sign In</span>
              </Button>
            </form>
          </div>
          <div style={{ width: "100%", paddingTop: "2%", paddingBottom: "2%" }}>
            <div
              className="loginBg"
              style={{
                height: "100%",
                fontFamily: "Cantata One",
                fontSize: "64px",
                textAlign: "center",
                marginLeft: "15px",

                padding: "20% 0",
                width: "100%",
                backgroundColor: "white",
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0px 0px 34px -6px rgba(220, 220, 220, 0.3)",
                backdropFilter: "blur(40px)",
                border: "2px solid black",
              }}
            >
              {/* photo showcase */}
              {/* <img src={bg} style={{}} ></img> */}
              Welcome to Atheneum
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
