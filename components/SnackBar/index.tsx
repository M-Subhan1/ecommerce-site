import React, { FC, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { setSnackBar } from "../../src/actions";
import { IState } from "../../src/reducers";

interface ComponentProps {
  snackbar: IState["snackbar"];
  setSnackBar: (state: IState["snackbar"]) => void;
}

const SnackBar: FC<ComponentProps> = props => {
  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setSnackBar({
      isOpen: false,
      type: props.snackbar.type,
      message: "",
    });
  };

  return (
    <div>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={props.snackbar.isOpen}
        onClose={handleClose}
      >
        <Alert
          style={{ backgroundColor: "white" }}
          onClose={handleClose}
          severity={props.snackbar.type}
          elevation={6}
          variant='outlined'
        >
          {props.snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return { snackbar: state.snackbar };
};

export default connect(mapStateToProps, { setSnackBar })(SnackBar);
