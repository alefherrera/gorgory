import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { roleSelector } from '../../selectors/session';
import isAuthorized from '../../util/isAuthorized';

export default (getPermissions = () => []) => (ChildComponent) => {
  const displayName = ChildComponent.displayName || ChildComponent.name || 'Component';

  const AuthWrapper = ({ ownedPermissions, ...rest }) => {
    const neededPermissions = getPermissions(rest);
    if (isAuthorized(ownedPermissions, neededPermissions)) {
      return <ChildComponent {...rest} />;
    }
    return null;
  };

  AuthWrapper.displayName = `AuthWrapper(${displayName})`;
  AuthWrapper.propTypes = {
    ownedPermissions: PropTypes.any,
  };

  return connect(
    state => ({
      ownedPermissions: [roleSelector(state)],
    }),
    null,
  )(AuthWrapper);
};
