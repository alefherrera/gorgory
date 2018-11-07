import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { goBack } from 'connected-react-router';
import UserForm from './UserForm';
import { addUser } from '../../actions/user';
import { displayNotification } from '../../actions/notification';

class AddUserPage extends Component {
  handleSubmit = (values) => {
    this.props.addUser(values).then((totem) => {
      this.props.displayNotification('Usuario agregado correctamente').then(() => {
        this.props.goBack();
      });
      return totem;
    });
  };

  render() {
    return (
      <div>
        <UserForm
          title="Agregar Usuario"
          buttonText="Agregar"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        />
      </div>
    );
  }
}

AddUserPage.propTypes = {
  addUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  displayNotification: PropTypes.func,
  goBack: PropTypes.func,
};

export default reduxForm({
  form: 'addUser',
  initialValues: {
    permissions: {},
  },
})(
  connect(
    null,
    {
      addUser,
      displayNotification,
      goBack,
    },
  )(AddUserPage),
);
