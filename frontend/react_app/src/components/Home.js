import React, { useState, useEffect, Authorization } from "react";
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
  let isadmin1 = false;
  function isItAdmin1() {
    //Axios variables required to call the API
    let headers = { Authorization: `Token ${props.token}` };

    let url = "http://127.0.0.1:8000/api/lib/isitadmin/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setadmstat(res.data["detail"]);
      })
      .catch((error) => {
        alert(error);
      });

    if (isadmin === true) {
      setadmstat(true);
    } else {
      setadmstat(false);
    }
    return isadmin;
  }

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
  const [irstatus, setIrstatus] = React.useState(null);
  const [tabtit, setTabtit] = React.useState(null);
  const [isadmin, setadmstat] = React.useState(true); // uses negative logic

  // for table manipulation
  const [col, setCol] = React.useState([]);

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
        alert("Only Admin can Register Returned Book");
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
        alert("Only Admin can issue books");
      });
  };

  // Function to make the predict API call and update the state variable - Prediction
  const getBooks = (event) => {
    setTabtit("Books in LIBRARY");

    setCol([
      { title: "ID", field: "id" },
      { title: "Title", field: "title" },
      { title: "Genre", field: "cat" },
      { title: "Author", field: "author_id" },
      { title: "Status", field: "Status" },
      { title: "URL", field: "book_url" },
    ]);

    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      Accept: "/",
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

  //getissueRec
  const getissueRec = (event) => {
    setTabtit("Issue Records");

    setCol([
      { title: "ID", field: "id" },
      { title: "IssuedAt", field: "doi" },
      { title: "Book", field: "tob_id" },
      { title: "Issued_To", field: "nop" },
    ]);

    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      Accept: "/",
      "Accept-Encoding": "gzip, deflate, br",
    };

    let url = "http://127.0.0.1:8000/api/lib/getissuerec/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setPrediction(res.data["issue"]);
      })
      .catch((error) => {
        alert("Only Admin can view Records");
      });
  };

  const getLogRec = (event) => {
    setTabtit("LOG HISTORY RECORDS");

    setCol([
      { title: "ID", field: "id" },
      { title: "Was_Issued_at", field: "doi_log" },
      { title: "Submitted_at", field: "dor_log" },
      { title: "Book", field: "tob_log_id" },
      { title: "Issued_To", field: "nop_log" },
    ]);

    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      Accept: "/",
      "Accept-Encoding": "gzip, deflate, br",
    };

    let url = "http://127.0.0.1:8000/api/lib/getlogrec/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setPrediction(res.data["issue"]);
      })
      .catch((error) => {
        alert("Only Admin can view History LOG of issue");
      });
  };

  const isItAdmin = (event) => {
    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      Accept: "/",
      "Accept-Encoding": "gzip, deflate, br",
    };

    let url = "http://127.0.0.1:8000/api/lib/isitadmin/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setadmstat(res.data["detail"]);
      })
      .catch((error) => {
        alert(error);
      });

    if (isadmin === true) {
      setadmstat(true);
    } else {
      setadmstat(false);
    }
    return isadmin;
  };

  const AdminPanel = (
    <Container fixed className={classes.container} fullWidth display="none">
      <Typography>* for Admins</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="bid"
        label="Book id"
        name="bid"
        autoComplete="off"
        onChange={handleFormFieldChange}
      />
      <TextField
        required
        variant="outlined"
        margin="normal"
        fullWidth
        id="pname"
        label="Person Info"
        name="pname"
        autoComplete="off"
        onChange={handleFormFieldChange}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={getThatBook}
      >
        issue book
      </Button>
      <Button
        type="submit"
        fullWidth
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
        {isadmin} {bid} {irstatus}
      </Typography>
    </Container>
  );

  /*
const NOTAdminPanel = (
<div></div>
    );
  */

  return (
    <React.Fragment>
      <CssBaseline />

      <Container fixed className={classes.container}>
        <Grid container alignItems="center" spacing={3} fullWidth>
          <Grid item xs={6}>
            {AdminPanel}

            <Paper className={classes.title} elevation={0}>
              <Button variant="contained" color="primary" onClick={getBooks}>
                Get Complete List
              </Button>

              <Button
                variant="contained"
                style={{ color: "red", backgroundColor: "#000000" }}
                onClick={getissueRec}
              >
                Issue Record
              </Button>

              <Button
                variant="contained"
                style={{ color: "red", backgroundColor: "#000000" }}
                onClick={getLogRec}
              >
                Issue LOG
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Grid item>
        <Paper className={classes.title} elevation={0}>
          <div>
            <MaterialTable
              style={{ color: "black", backgroundColor: "#e5b79a" }}
              title={tabtit}
              data={prediction}
              columns={col}
            />
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default Home
