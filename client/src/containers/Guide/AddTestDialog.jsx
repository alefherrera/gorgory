import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledForm } from '../../components/Generic';
import AreaTextWrapper from '../../components/AreaTextWrapper';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import { newTest } from '../../actions/guide';

class AddTestDialog extends Component {
  state = {
    open: false,
  };

  componentWillReceiveProps = (nextProps, prevState) => {
    this.setState({ open: nextProps.open });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleOnSubmit = (values) => {
    this.props.newTest(values);

    this.handleClose();
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
        <StyledForm
          flat
          onSubmit={this.props.handleSubmit(this.handleOnSubmit)}
          onCancel={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Agregar Test</DialogTitle>
          <DialogContent>
            <Field name="name" label="Nombre" component={TextFieldWrapper} />
            <Field name="input" label="Input" rows="10" maxRows="5" component={AreaTextWrapper} />
            <Field name="output" label="Output" rows="10" maxRows="5" component={AreaTextWrapper} />
          </DialogContent>
        </StyledForm>
      </Dialog>
    );
  }
}

export default connect(
  null,
  { newTest },
)(reduxForm({ form: 'addTest' })(AddTestDialog));
