import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledForm } from '../../components/Generic';
import AreaTextWrapper from '../../components/AreaTextWrapper';

class AddTestDialog extends Component {
  handleOnSubmit = (values) => {
    this.props.onSubmit({
      ...values,
      arguments: values.input && values.input.split(',').map(x => ({ value: x })),
    });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        fullWidth
        open={this.props.open}
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
            <Field name="input" label="Input" rows="10" maxRows="5" component={AreaTextWrapper} />
            <Field
              name="expected"
              label="Output"
              rows="10"
              maxRows="5"
              component={AreaTextWrapper}
            />
          </DialogContent>
        </StyledForm>
      </Dialog>
    );
  }
}

AddTestDialog.propTypes = {
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default connect(
  null,
  null,
)(reduxForm({ form: 'addTest' })(AddTestDialog));
