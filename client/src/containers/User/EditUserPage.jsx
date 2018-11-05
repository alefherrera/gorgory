import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { goBack } from 'connected-react-router';
import { getUser, editUser } from '../../actions/user';
import { userSelector } from '../../selectors/entities/user';
import RoleForm from './UserForm';
import { displayNotification } from '../../actions/notification';

class EditRolePage extends Component {
  componentDidMount() {
    this.props.getUser(undefined, this.props.match.params);
  }

  handleSubmit = (values) => {
    this.props.editUser(this.props.match.params.id, values).then((operator) => {
      this.props.displayNotification('Usuario editado correctamente').then(() => {
        this.props.goBack();
      });
      return operator;
    });
  };

  render() {
    return (
      <RoleForm
        title="Editar Usuario"
        buttonText="Editar"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      />
    );
  }
}

EditRolePage.propTypes = {
  handleSubmit: PropTypes.func,
  getUser: PropTypes.func,
  editUser: PropTypes.func,
  match: PropTypes.object,
  displayNotification: PropTypes.func,
  goBack: PropTypes.func,
};

export default connect(
  state => ({
    initialValues: userSelector(state),
  }),
  {
    getUser,
    editUser,
    displayNotification,
    goBack,
  },
)(
  reduxForm({
    form: 'editUser',
    enableReinitialize: true,
  })(EditRolePage),
);
