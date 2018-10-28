import { createSelector } from 'reselect';
import isAuthorized from '../util/isAuthorized';

export const baseSelector = createSelector(state => state.session, session => session);

export const userSelector = createSelector(baseSelector, session => session.user);

export const isAuthenticatedSelector = createSelector(
  baseSelector,
  session => !!session.accessToken,
);

export const menuSelector = createSelector(baseSelector, session => session.menu);

export const usernameSelector = createSelector(userSelector, user => user.username);

export const nameSelector = createSelector(userSelector, user => user.name);

export const roleSelector = createSelector(userSelector, user => user.role.name);

export const hasAccessSelector = createSelector(
  roleSelector,
  (state, props) => props,
  (owned, needed) => isAuthorized(owned, needed),
);
