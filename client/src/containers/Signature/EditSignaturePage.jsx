import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { goBack } from 'connected-react-router';
import { getSignature, editSignature } from '../../actions/signature';
import { signatureSelector } from '../../selectors/entities/signature';
import RoleForm from './SignatureForm';
import { displayNotification } from '../../actions/notification';

class EditSignaturePage extends Component {
  componentDidMount() {
    this.props.getSignature(undefined, this.props.match.params);
  }

  handleSubmit = (values) => {
    this.props.editSignature(values, this.props.match.params).then((operator) => {
      this.props.displayNotification('Materia editada correctamente').then(() => {
        this.props.goBack();
      });
      return operator;
    });
  };

  render() {
    return (
      <RoleForm
        title="Editar Materia"
        buttonText="Editar"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      />
    );
  }
}

EditSignaturePage.propTypes = {
  handleSubmit: PropTypes.func,
  getSignature: PropTypes.func,
  editSignature: PropTypes.func,
  match: PropTypes.object,
  displayNotification: PropTypes.func,
  goBack: PropTypes.func,
};

export default connect(
  state => ({
    initialValues: signatureSelector(state),
  }),
  {
    getSignature,
    editSignature,
    displayNotification,
    goBack,
  },
)(
  reduxForm({
    form: 'editSignature',
    enableReinitialize: true,
  })(EditSignaturePage),
);
