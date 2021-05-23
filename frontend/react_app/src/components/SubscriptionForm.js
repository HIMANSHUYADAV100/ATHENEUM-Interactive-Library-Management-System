import React, { Fragment, useState } from "react";
import { Button } from "@material-ui/core";

function SubscriptionForm() {
  const subscriptionHandler = (e) => {
    e.preventDefault();
    console.log("fkdsj");
    setFormVisibility("none");
    setSubscriptionStatus("Now You'll Get Weekly Book Recommendations");
  };

  let [formVisibility, setFormVisibility] = useState("flex");
  let [subscriptionsStatus, setSubscriptionStatus] = useState(null);

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
  const msgStyle = { fontFamily: "NTR", fontSize: "20px" };
  const formAlignment = {
    display: formVisibility,
    justifyContent: "center",
  };
  return (
    <Fragment>
      <span style={msgStyle}>{subscriptionsStatus}</span>

      <div style={formAlignment}>
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
    </Fragment>
  );
}

export default SubscriptionForm;
