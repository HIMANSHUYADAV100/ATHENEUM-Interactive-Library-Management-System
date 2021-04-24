import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import axios from "axios";


import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";

import Link from "@material-ui/core/Link";
import MaterialTable from "material-table";
import { authCheckState,loadUser,authLogout } from "../store/authActions";


const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "85%",
    marginTop: "3vh",
    marginBottom: "3vh",
    borderRadius: "6px",
    backgroundColor: "#FAE5BD",
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

  // const columns = [
  //   { title: "ID", field: "id" },
  //   { title: "Title", field: "title" },
  //   { title: "Author", field: "author_id" },
  //   { title: "Status", field: "Status" },
  // ];

  // React hook state variable

  const [tableContent, setTableContent] = useState([]);


  const [bid, setbid] = React.useState(null);
  const [pname, setpname] = React.useState(null);
  const [irstatus, setIrstatus] = React.useState(null);
  const [tabtit, setTabtit] = React.useState(null);

  const [isadmin, setadmstat] = React.useState(null); // uses negative logic


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
      Authorization: `Token ${props.token}`
    };

    let url = "http://127.0.0.1:8000/api/lib/getissuerec/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setTableContent(res.data["issue"]);
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
      Authorization: `Token ${props.token}`
    };

    let url = "http://127.0.0.1:8000/api/lib/getlogrec/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    axios(config)
      .then((res) => {
        setTableContent(res.data["issue"]);
      })
      .catch((error) => {
        alert("Only Admin can view History LOG of issue");
      });
  };


  const AdminPanel = (
    <Container fixed className={classes.container} display="none">
      <Typography>* for Admins</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
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
        id="pname"
        label="Person Info"
        name="pname"
        autoComplete="off"
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
        {isadmin} {bid} {irstatus}
      </Typography>
    </Container>
  );

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
      // Content-Type
    };
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = "http://127.0.0.1:8000/api/lib/books/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    return axios(config)
      .then((res) => {
        setTableContent(res.data["Books"]);
      })
      .catch((error) => {

      });
  };



  useEffect(() => {
    getBooks(); 
  },[]);

  return (
    <React.Fragment>
      <CssBaseline />

      <Grid item>
        <div>
          <MaterialTable
            options={{
              search: true,
              rowStyle: {
                fontFamily: "NTR",
                fontSize: "17px",
              },
              headerStyle:{
                fontFamily:"NTR",
                fontWeight:"bold",
                fontSize:"20px"
              }
            }}
            style={{ color: "black" }}
            title={tabtit}
            data={tableContent}
            columns={col}
          />
        </div>
      </Grid>

      <Container fixed className={classes.container}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6}>
            {AdminPanel}

            <Paper className={classes.title} elevation={0}>
              <Button variant="contained" color="primary" onClick={getBooks}>
                All Books
              </Button>

              <Button
                variant="contained"
                style={{ color: "red", backgroundColor: "#000000" }}
                onClick={getissueRec}
              >
                Currently Issued
              </Button>

              <Button
                variant="contained"
                style={{ color: "red", backgroundColor: "#000000" }}
                onClick={getLogRec}
              >
                Issue History
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
    token: state.auth.token
  }
}

//This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(authCheckState()),
    logout: () => dispatch(authLogout()),
    user:()=>dispatch(loadUser()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
