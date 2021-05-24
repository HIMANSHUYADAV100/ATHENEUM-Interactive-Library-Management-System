import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import IssueReturnForm from "../components/IssueReturnForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const IssueReturnDialog = (props) => {
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
          <span
            style={{
              fontFamily: "NTR",
              fontSize:"36px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {"Issue Or Return A Book"}
            <Button edge="end" onClick={props.close} color="primary">
              <CancelRoundedIcon
                style={{ paddingBottom: "4px", color: "grey" }}
              />
            </Button>
          </span>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <IssueReturnForm />
          </DialogContentText>
        </DialogContent>

        <DialogActions></DialogActions>
        
      </Dialog>
    </Fragment>
  );
};

export default IssueReturnDialog;
