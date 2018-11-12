import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/user';
import ListFormComponent from '../../components/ListFormComponent';
import { displayNotification } from '../../actions/notification';
import { usersSelector } from '../../selectors/entities/user';

class UserListPage extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  getPrimaryText = x => x.name;

  getSecondaryText = () => '';

  handleDeleteClick = (id) => {
    this.props.deleteUser(undefined, { id }).then((x) => {
      this.props.displayNotification('Usuario eliminado correctamente');
      return x;
    });
  };

  render() {
    const { users } = this.props;
    return (
      <ListFormComponent
        title="Usuarios"
        items={users}
        getPrimaryText={this.getPrimaryText}
        getSecondaryText={this.getSecondaryText}
        onDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

UserListPage.propTypes = {
  getUsers: PropTypes.func,
  deleteUser: PropTypes.func,
  users: PropTypes.array,
  displayNotification: PropTypes.func,
};

export default connect(
  state => ({
    users: usersSelector(state),
  }),
  { getUsers, deleteUser, displayNotification },
)(UserListPage);
