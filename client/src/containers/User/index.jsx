import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import UserListPage from './UserListPage';
import AddUserPage from './AddUserPage';
import EditUserPage from './EditUserPage';

const User = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={UserListPage} />
    <Route path={`${match.url}/add`} component={AddUserPage} />
    <Route path={`${match.url}/edit/:id`} component={EditUserPage} />
  </Switch>
);

User.propTypes = {
  match: PropTypes.object,
};

export default User;
