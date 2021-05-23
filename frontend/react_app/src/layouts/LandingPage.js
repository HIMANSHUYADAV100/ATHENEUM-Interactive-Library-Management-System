import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

import SubscriptionForm from "../components/SubscriptionForm";
import JoinClub from "../components/JoinClub.js";

const LandingPage = (props) => {
  if (props.isAuthenticated) {
    <Redirect to="/"></Redirect>;
  }

  const primaryTxtStyle = {
    fontFamily: "Cantata One",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "56px",
    lineHeight: "81px",
    paddingTop: "15vh",
    paddingBottom: "10vh",
  };
  
  return (
    <Fragment>
      <div style={{ height: "90vh", textAlign: "center" }}>
        <div style={primaryTxtStyle}>
          Read A New Favourite <br />
          Every Week
        </div>

        <SubscriptionForm />
      </div>
      <JoinClub />
    </Fragment>
  );
};

export default LandingPage;
