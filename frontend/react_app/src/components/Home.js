import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";


// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {

  const [tableContent, setTableContent] = useState([]);
  const [tableTitle, setTableTitle] = React.useState(null);

  // for table manipulation
  const [columnHeaders, setColumnHeaders] = React.useState([]);

  //getissueRec
  const getCurrentlyIssuedBooks = (event) => {
    setTableTitle("Issue Records");

    setColumnHeaders([
      { title: "ID", field: "id" },
      { title: "IssuedAt", field: "doi" },
      { title: "Book", field: "tob_id" },
      { title: "Issued_To", field: "nop" },
    ]);

    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
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

  const getPreviouslyIssuedBooks = (event) => {
    setTableTitle("Issuing History");

    setColumnHeaders([
      { title: "ID", field: "id" },
      { title: "Was_Issued_at", field: "doi_log" },
      { title: "Submitted_at", field: "dor_log" },
      { title: "Book", field: "tob_log_id" },
      { title: "Issued_To", field: "nop_log" },
    ]);

    //Axios variables required to call the API
    let headers = {
      Authorization: `Token ${props.token}`,
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

  // Function to make the predict API call and update the state variable - Prediction
  const getBooks = (event) => {
    setTableTitle("Books in LIBRARY");

    setColumnHeaders([
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

    let url = "http://127.0.0.1:8000/api/lib/books/";
    let method = "post";
    let config = { headers, method, url };

    //Axios predict API call
    return axios(config)
      .then((res) => {
        setTableContent(res.data["Books"]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(()=>{
    props.user()
  },[])
  const buttonStyle = {
    margin: "2px 10px",
    color: "black",
    backgroundColor: "white",
  };

  const toolbarButtons = (props) => (
    <div>
      <MTableToolbar {...props}></MTableToolbar>

      <Button variant="outlined" onClick={getBooks} style={buttonStyle}>
        All Books
      </Button>
      <Button variant="outlined" style={buttonStyle} onClick={getCurrentlyIssuedBooks}>
        Currently Issued
      </Button>

      <Button variant="outlined" style={buttonStyle} onClick={getPreviouslyIssuedBooks}>
        Issue History
      </Button>
    </div>
  );

  const materialTableOptions = {
    search: true,
    headerStyle: {
      width: "10px",
    },
    rowStyle: {
      fontFamily: "NTR",
      fontSize: "17px",
    },
    headerStyle: {
      fontFamily: "NTR",
      fontWeight: "bold",
      fontSize: "20px",
    },
    padding: "dense",
    pageSizeOptions: 5,
    paginationType: "normal",
    paginationPosition: "bottom", //stepped
  };

  let username;
  if (!!props.current_user) {
    username = props.current_user.username;
  }

  function ButtonsOrNot() {
    if (props.isAuthenticated && username === "admin") {
      return { Toolbar: toolbarButtons };
    } else {
      return {};
    }
  }

  const materialTableComponents = ButtonsOrNot();

  return (
    <React.Fragment>


      <Grid item>
        <div>
          <MaterialTable
            components={materialTableComponents}
            options={materialTableOptions}
            title={tableTitle}
            data={tableContent}
            columns={columnHeaders}
          />
        </div>
      </Grid>
    </React.Fragment>
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

export default connect(mapStateToProps)(Home);
