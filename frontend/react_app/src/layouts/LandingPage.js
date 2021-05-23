import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import BookClubBg from "../components/Images/BookClubBg.png";

const LandingPage = (props) => {
  if (props.isAuthenticated) {
    <Redirect to="/"></Redirect>;
  }
  const inputStyle = {
    fontFamily: "NTR",
    fontSize: "24px",
    border: "1px solid #331F00",
    boxSizing: "border-box",
    borderRadius: "3px",
    margin: "0 3vw 0 0",
    paddingLeft: "1vw",
    width: "40vw",
    height: "6vh",
  };
  const buttonStyle = {
    // height: "6vh",
    lineHeight: "4vh",
    // width: "8vw",
    padding: "0 15px ",
    background: "#FFFFFF",
    boxShadow:
      "0px 0px 6px 1px rgba(255, 255, 255, 0.9), inset -3px 0px 26px -6px rgba(133, 133, 133, 0.25)",
    borderRadius: "5px",
    border: "3px solid black",
    fontFamily: "NTR",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
  };

  let [subscriptionsStatus, setSubscriptionStatus] = useState(null);
  let [formVisibility, setFormVisibility] = useState("flex");

  const subscriptionHandler = (e) => {
    e.preventDefault();
    console.log("fkdsj");
    setFormVisibility("none");
    setSubscriptionStatus(
      "Now You'll Get Weekly Book Recommendations"
    );
  };
  return (
    <Fragment>
      <div style={{ height: "90vh", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Cantata One",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "56px",
            lineHeight: "81px",
            paddingTop: "15vh",
            paddingBottom: "10vh",
          }}
        >
          Read A New Favourite <br />
          Every Week
        </div>
        <span style={{fontFamily:"NTR",fontSize:"20px"}}>{subscriptionsStatus}</span>
        <div
          style={{
            display: formVisibility,
            justifyContent: "center",
          }}
        >
          <form onSubmit={subscriptionHandler}>
            <input
              type="email"
              placeholder="Enter Email"
              required
              style={inputStyle}
            ></input>
            <Button type="submit" style={buttonStyle}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div
        style={{
          height: "90vh",
          width: "100%",
          // paddingTop:"10vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            // background: "red",
            background: `url(${BookClubBg})`,
            // height: "70%",
            width: "30%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            color: "white",
            fontFamily: "Cantata One",
            fontSize: "48px",
            fontWeight: "bold",
            padding: "3px 10px 0 0 ",
          }}
        >
          <span>BOOK</span>
        </div>
        <div
          style={{
            paddingLeft: "20px",
            fontFamily: "NTR",
            fontSize: "24px",
            lineHeight: "36px",
          }}
        >
          <span
            style={{
              fontFamily: "Cantata One",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "48px",
              lineHeight: "61px",
              letterSpacing: "0.22em",
            }}
          >
            CLUB
          </span>
          <br />
          Interesting Community of Voracious Readers where they exchange ideas,
          <br />
          express opinions, chatter philosophy and idealize characters of the
          <br />
          books they have already read. Sounds Interesting ? You can join the
          <br />
          club too.
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              style={{
                ...buttonStyle,
                marginTop: "50px",
                padding: "10px 50px",
                fontSize: "32px",
              }}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
