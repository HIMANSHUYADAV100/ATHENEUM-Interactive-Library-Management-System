import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import BookClubBg from "./Images/BookClubBg.png";

function JoinClub() {
  const buttonStyle = {
    lineHeight: "4vh",
    background: "#FFFFFF",
    boxShadow:
      "0px 0px 6px 1px rgba(255, 255, 255, 0.9), inset -3px 0px 26px -6px rgba(133, 133, 133, 0.25)",
    borderRadius: "5px",
    border: "3px solid black",
    fontFamily: "NTR",
    fontStyle: "normal",
    fontWeight: "normal",
    marginTop: "50px",
    padding: "10px 50px",
    fontSize: "32px",
  };

  const wrapperStyle = {
    height: "90vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  };
  const bgImg = {
    background: `url(${BookClubBg})`,
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
  };

  const descTextStyle = {
    paddingLeft: "20px",
    fontFamily: "NTR",
    fontSize: "24px",
    lineHeight: "36px",
  };
  const HeadingStyle = {
    fontFamily: "Cantata One",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "48px",
    lineHeight: "61px",
    letterSpacing: "0.22em",
  };

  const buttonWrapper = {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  };

  return (
    <Fragment>
      <div style={wrapperStyle}>
        <div style={bgImg}>
          <span>BOOK</span>
        </div>
        <div style={descTextStyle}>
          <span style={HeadingStyle}>CLUB</span>
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
            style={buttonWrapper}
          >
            <Button style={buttonStyle}>Join</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default JoinClub;
