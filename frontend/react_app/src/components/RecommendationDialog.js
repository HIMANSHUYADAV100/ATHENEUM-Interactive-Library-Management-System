import React, { Fragment } from "react";
import {connect }from 'react-redux';
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
  const user_id = props.current_user.id;
  return (
    <Fragment>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Your Next Favourite Book Could Be"}
          <Button edge="end" onClick={props.close} color="primary">
            <CancelRoundedIcon
              style={{ paddingBottom: "4px", color: "grey" }}
            />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span style ={{display:'flex',flexDirection:'column'}}>

            <h1>Current User Id : {user_id}</h1>
            {"Looking For Alaska"}

          <Button variant="outlined" onClick={props.close}>
            Get Another Recommendation
          </Button>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
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

export default connect(mapStateToProps)(RecommendationDialog) ;
