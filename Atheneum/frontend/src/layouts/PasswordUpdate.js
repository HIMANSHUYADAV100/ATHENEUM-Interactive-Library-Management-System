import React from "react";
import axios from "axios";
import favicon from "../components/Images/favicon.ico";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    border: "1px solid white",
    borderRadius: "10px",
    fontFamily: "NTR",
    fontSize: "large",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    fontFamily: "NTR",
    fontSize: "large",
    flexDirection: "column",
    padding: "10%",
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    width: "100%",
    color: "black",
    fontFamily: "NTR",
    boxShadow: " 0px 6px 70px 4px rgba(250, 229, 189, 0.5)",
    margin: "10px 10px 10px 0",
    borderRadius: "5px",
    backgroundColor: "#FAE5BD",
    fontSize: "18px",
  },
  success: {
    color: theme.palette.success.main,
  },
}));

function PasswordUpdate(props) {
  const classes = useStyles();
  const [new_password1, setNewPassword1] = React.useState(null);
  const [new_password2, setNewPassword2] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleFormFieldChange = (event) => {
    setSuccess(false);
    switch (event.target.id) {
      case "new_password1":
        setNewPassword1(event.target.value);
        break;
      case "new_password2":
        setNewPassword2(event.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new_password1 !== new_password2) {
      alert("Passwords don't match");
    } else {
      let headers = { Authorization: `Token ${props.token}` };
      let method = "post";
      let url = "http://127.0.0.1:8000/api/auth/update_password/";
      let passwordFormData = new FormData();
      passwordFormData.append("new_password1", new_password1);
      passwordFormData.append("new_password2", new_password2);
      let config = { headers, method, url, data: passwordFormData };
      //Axios update_password API call
      axios(config)
        .then((res) => {
          setSuccess(true);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <Container component="main" className={classes.paper} maxWidth="xs">
      <div
        style={{
          background: `url(${favicon})`,
          display: "none",
        }}
      ></div>
      
      {success ? (
        <Typography variant="outlined" className={classes.success}>
          Password update successful!
        </Typography>
      ) : null}
      <Avatar className={classes.avatar}>
        <VpnKeyIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Update Password
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="new_password1"
          label="Enter New Password"
          type="password"
          id="new_password1"
          onChange={handleFormFieldChange}
          error={new_password1 !== new_password2}
          helperText={
            new_password1 !== new_password2 ? "Passwords don't match" : null
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="new_password2"
          label="Enter Your Password Again"
          type="password"
          id="new_password2"
          onChange={handleFormFieldChange}
          error={new_password1 !== new_password2}
          helperText={
            new_password1 !== new_password2 ? "Passwords don't match" : null
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Password
        </Button>
      </form>
    </Container>
  );
}

export default PasswordUpdate;
