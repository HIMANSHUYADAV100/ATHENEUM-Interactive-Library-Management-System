import React,{Fragment,useState,useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {connect} from 'react-redux';

const IssueReturnForm = (props) => {

  const[book_id,setBook_Id] = useState(null)
  const[borrower_details,set_Borrower_details] = useState(null)
  const[confirm_Msg, set_Confirm_Msg] = useState(null)

  const ReturnBook = (event) => {
    //Axios variables required to call the API
    let headers = { Authorization: `Token ${props.token}` };
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = "http://127.0.0.1:8000/api/lib/return/";
    let method = "post";

    let issueFormData = new FormData();
    issueFormData.append("iid", { book_id });

    let config = {
      headers,
      method,
      url,
      data: {
        iid: book_id,
      },
    };

    axios(config)
      .then((res) => {
        // setIrstatus(res.data["statusB"]);
        set_Confirm_Msg(res.data['statusB'])
        console.log(confirm_Msg);
      })
      .catch((error) => {
        alert("Only Admin can Register Returned Book");
      });
  };

  const IssueBook = (event) => {
    //Axios variables required to call the API
    let headers = { Authorization: `Token ${props.token}` };
    console.log(props)
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = "http://127.0.0.1:8000/api/lib/issue/";
    let method = "post";

    let issueFormData = new FormData();
    issueFormData.append("iid", book_id);
    issueFormData.append("name", borrower_details);

    let config = { headers, method, url, data: issueFormData };

    axios(config)
      .then((res) => {
        // setIrstatus(res.data["statusB"]);
        set_Confirm_Msg(res.data['statusB'])
        console.log(confirm_Msg);
      })
      .catch((error) => {
        alert("Only Admin can issue books");
      });
  };

  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case "book_id":
        setBook_Id(event.target.value);
        break;
      case "borrower_details":
        set_Borrower_details(event.target.value);
        break;
      default:
        return null;
    }
  };
  useEffect(()=>{
    set_Confirm_Msg(null)

  },[])

  return (
    <Fragment>

      <TextField
        variant="outlined"
        margin="normal"
        required
        id="book_id"
        label="Book id"
        name="book_id"
        autoComplete="off"
        onChange={handleFormFieldChange}
      />
      <TextField
        required
        variant="outlined"
        margin="normal"
        id="borrower_details"
        label="Person Info"
        name="borrower_details"
        autoComplete="off"
        onChange={handleFormFieldChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={IssueBook}
      >
        Issue Book
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={ReturnBook}
      >
        Return Book
      </Button>
      <div>
        {confirm_Msg}
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(IssueReturnForm);
