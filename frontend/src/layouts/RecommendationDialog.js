import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const RecommendationDialog = (props) => {
  let user_id = 700;
  if (!!props.current_user) {
    user_id = props.current_user.id;
  }

  useEffect(() => {
    const getRecommendation = (event) => {
      let token = localStorage.getItem("token");
      let body = JSON.stringify({ user_id });
      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };

      //Axios predict API call
      axios
        .post("http://127.0.0.1:8000/api/getRecommendations/", body, config)
        .then((res) => {
          setBookNames(getAttr(res.data, "Book_Name"));
          setAvgRatings(getAttr(res.data, "Book_Rating"));
          setSummaries(getAttr(res.data, "Book_Summary"));
          setGenres(getAttr(res.data, "Book_Genre"));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRecommendation();// eslint-disable-next-line
  }, []);

  function getAttr(res, attr) {
    let result = [];
    for (let i in res) {
      result.push(res[i][attr]);
    }
    return result;
  }

  const [index, setIndex] = useState(0);
  const [bookName, setBookNames] = useState([]);
  const [genre, setGenres] = useState([]);
  const [summary, setSummaries] = useState([]);
  const [avgRating, setAvgRatings] = useState([]);

  const getNext = (event) => {
    setIndex((index + 1) % 5);
  };

  return (
    <Fragment>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        style={{ height: "95vh" }}
        fullWidth="true"
        maxWidth="md"
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            {"Your Next Favourite Book Could Be"}
            <Button edge="end" onClick={props.close} color="primary">
              <CancelRoundedIcon
                style={{ paddingBottom: "4px", color: "grey" }}
              />
            </Button>
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "Black" }}
          >
            {!bookName[index] ? (
              <Fragment>Wait till we find you Something to Read</Fragment>
            ) : (
              <Fragment>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <h1>{bookName[index]}</h1>
                  <span>Genre : {genre[index]}</span>
                  <span>Rating :{avgRating[index]}</span>
                  <h3>Summary</h3>
                  <span>{summary[index]}</span>
                </span>
              </Fragment>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            style={{
              fontFamily: "NTR",
              boxShadow: " 0px 6px 70px 4px rgba(250, 229, 189, 0.5)",
              margin: "10px",
              borderRadius: "5px",
              backgroundColor: "#FAE5BD",
              fontSize: "18px",
              paddingTop: "6px",
            }}
            onClick={getNext}
          >
            Get Another Recommendation
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      state.auth.token !== null && typeof state.auth.token !== "undefined",
    token: state.auth.token,
    current_user: state.auth.user,
  };
};

export default connect(mapStateToProps)(RecommendationDialog);
