import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { goBack } from 'connected-react-router';
import SignatureForm from './SignatureForm';
import { addSignature } from '../../actions/signature';
import { displayNotification } from '../../actions/notification';

class AddSignaturePage extends Component {
  handleSubmit = (values) => {
    this.props.addSignature(values).then((totem) => {
      this.props.displayNotification('Materia agregada correctamente').then(() => {
        this.props.goBack();
      });
      return totem;
    });
  };

  render() {
    return (
      <div>
        <SignatureForm
          title="Agregar Materia"
          buttonText="Agregar"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        />
      </div>
    );
  }
}

AddSignaturePage.propTypes = {
  addSignature: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  displayNotification: PropTypes.func,
  goBack: PropTypes.func,
};

export default reduxForm({
  form: 'addSignature',
  initialValues: {
    permissions: {},
  },
})(
  connect(
    null,
    {
      addSignature,
      displayNotification,
      goBack,
    },
  )(AddSignaturePage),
);
