import React, { useState } from "react";
import axios from "axios";
import * as settings from "../settings";

import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Slider,
  Button,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import MaterialTable from "material-table";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "85%",
    marginTop: "3vh",
    marginBottom: "3vh",
    borderRadius: "6px",
    backgroundColor: theme.palette.action.disabledBackground,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    color: theme.palette.primary.main,
  },
}));

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
  const classes = useStyles();

  const columns = [
    { title: "ID", field: "id" },
    { title: "Title", field: "title" },
    { title: "Author", field: "author_id" },
    { title: "Status", field: "Status" },
  ];

  // React hook state variable
  const [prediction, setPrediction] = useState([]);
  const [bid, setbid] = React.useState(null);
  const [pname, setpname] = React.useState(null);
  const [irstatus, setIrstatus] = React.useState([]);

  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case "bid":
        setbid(event.target.value);
        break;
      case "pname":
        setpname(event.target.value);
        break;
      default:
        return null;
    }
  };

  const retThatBook = (event) => {
    //Axios variables required to call the API
    let headers = { Authorization: `Token ${props.token}` };
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = "http://127.0.0.1:8000/api/lib/return/";
    let method = "post";

    let issueFormData = new FormData();
    issueFormData.append("iid", { bid });

    let config = {
      headers,
      method,
      url,
      data: {
        iid: bid,
      },
    };

    axios(config)
      .then((res) => {
        setIrstatus(res.data["statusB"]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getThatBook = (event) => {
    //Axios variables required to call the API
    let headers = { Authorization: `Token ${props.token}` };
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = "http://127.0.0.1:8000/api/lib/issue/";
    let method = "post";

    let issueFormData = new FormData();
    issueFormData.append("iid", bid);
    issueFormData.append("name", pname);

    let config = { headers, method, url, data: issueFormData };

    axios(config)
      .then((res) => {
        setIrstatus(res.data["statusB"]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Function to make the predict API call and update the state variable - Prediction
  const getBooks = (event) => {
    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    };
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = "http://127.0.0.1:8000/api/lib/books/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setPrediction(res.data["Books"]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container fixed className={classes.container}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6}>
            <Container fixed className={classes.container}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="bid"
                label="Book id"
                name="bid"
                autoComplete="off"
                autoFocus
                onChange={handleFormFieldChange}
              />
              <TextField
                required
                variant="outlined"
                margin="normal"
                id="pname"
                label="Person Info"
                name="pname"
                autoComplete="off"
                autoFocus
                onChange={handleFormFieldChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={getThatBook}
              >
                issue book
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={retThatBook}
              >
                return book
              </Button>

              <Typography variant="caption" display="inline">
                Status : <span>&nbsp;</span>
              </Typography>
              <Typography variant="body1" display="inline">
                {bid} {irstatus}
              </Typography>
            </Container>

            <Button variant="contained" color="primary" onClick={getBooks}>
              Get Complete List
            </Button>
            <tbody> </tbody>

            <Paper className={classes.title} elevation={0}>
              <Typography variant="h5" display="inline">
                Books in Library
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Grid item>
        <Paper className={classes.title} elevation={0}>
          <div>
            <MaterialTable
              backgroundColor="creme"
              title="Books"
              data={prediction}
              columns={columns}
            />
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
