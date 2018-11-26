import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, reset as resetForm } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledForm } from '../../components/Generic';
import AreaTextWrapper from '../../components/AreaTextWrapper';
import SwitchWrapper from '../../components/SwitchWrapper';
import { testToEditSelector } from '../../selectors/test';

class AddTestDialog extends Component {
  handleOnSubmit = (values) => {
    this.props.onSubmit({
      ...values,
      arguments: values.input && values.input.split(',').map(x => ({ value: x })),
    });
    this.props.resetForm('addTest');
  };

  handleClose = () => {
    this.props.onClose();
    this.props.resetForm('addTest');
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
          <Field name="isPublic" label="Publico" component={SwitchWrapper} />
          <DialogContent>
            <Field name="input" label="Input" rows="10" component={AreaTextWrapper} />
            <Field name="expected" label="Output" rows="10" component={AreaTextWrapper} />
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
  resetForm: PropTypes.func,
};

const getInitalValues = state => ({
  input: state.input,
  expected: state.expected,
  isPublic: state.isPublic,
});

export default connect(
  state => ({
    initialValues: { ...getInitalValues(testToEditSelector(state)), isPublic: true },
  }),
  { resetForm },
)(
  reduxForm({
    form: 'addTest',
    enableReinitialize: true,
  })(AddTestDialog),
);
