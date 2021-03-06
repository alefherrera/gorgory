import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser, filterUsers } from '../../actions/user';
import ListFormComponent from '../../components/ListFormComponent';
import { displayNotification } from '../../actions/notification';
import { usersSelector } from '../../selectors/entities/user';
import SearchBox from '../../components/SearchBox';

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

  handleSearch = (term) => {
    this.props.filterUsers(term);
  };

  render() {
    const { users } = this.props;
    return (
      <ListFormComponent
        title="Usuarios"
        items={users}
        header={<SearchBox onChange={this.handleSearch} />}
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
  filterUsers: PropTypes.func,
};

export default connect(
  state => ({
    users: usersSelector(state),
  }),
  {
    getUsers,
    deleteUser,
    filterUsers,
    displayNotification,
  },
)(UserListPage);
