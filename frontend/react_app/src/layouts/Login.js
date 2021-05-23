import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../Action/authActions";
import loginBg from "../components/Images/loginBackGround.jpg";

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
  },
  formWrapper: {
    marginLeft: "2vw",
    justifyContent: "center",
    padding: "3vw",
    width: "25%",
    height: "90%",
    backgroundColor: "white",
    background: "rgba(255, 255, 255, 0.7)",
    boxShadow: "0px 0px 34px -6px rgba(220, 220, 220, 0.3)",
    backdropFilter: "blur(20px)",
  },
  parentWrapper: {
    display: "flex",
    height: "78vh",
    overflow: "hidden",
    padding: "2vw",
  },
  pageTitle: {
    fontSize: "64px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "NTR",
  },
  bgImage: {
    background: `url(${loginBg})`,
    backgroundSize: "auto 140%",
    backgroundRepeat: "no-repeat",
    width: "75%",
    margin: "2% 0",
    overflow: "hidden",
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
      <div className={classes.paper}>
        <div className={classes.parentWrapper}>
          <div className={classes.formWrapper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Typography className={classes.pageTitle}>Sign in</Typography>

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
          <div className={classes.bgImage}></div>
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
