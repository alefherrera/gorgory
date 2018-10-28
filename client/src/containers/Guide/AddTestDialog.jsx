import React, { Component } from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { Field, reduxForm } from "redux-form";
import TextFieldWrapper from "../../components/TextFieldWrapper";
import AreaTextWrapper from "../../components/AreaTextWrapper";
import {
  RootFlexColumn,
  TitleText,
  StyledForm
} from "../../components/Generic";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { NewExercisesTable } from "../../components/Guide";

class AddTestDialog extends Component {
  state = {
    open: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <Dialog
        fullWidth
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar Test</DialogTitle>
        <DialogContent>
          <Field name="name" label="Nombre" component={TextFieldWrapper} />
          <Field
            name="input"
            label="Input"
            rows="10"
            maxRows="5"
            component={AreaTextWrapper}
          />
          <Field
            name="output"
            label="Output"
            rows="10"
            maxRows="5"
            component={AreaTextWrapper}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary">Cancelar</Button>
          <Button type="submit" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  {}
)(reduxForm({ form: "addTest" })(AddTestDialog));
