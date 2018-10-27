import { createSelector } from 'reselect';
import isAuthorized from '../util/isAuthorized';

export const baseSelector = createSelector(state => state.session, session => session);

export const isAuthenticatedSelector = createSelector(
  baseSelector,
  session => !!session.accessToken,
);

export const usernameSelector = createSelector(baseSelector, session => session.username);

export const nameSelector = createSelector(baseSelector, session => session.name);

export const roleSelector = createSelector(baseSelector, session => session.role.name);

export const hasAccessSelector = createSelector(
  roleSelector,
  (state, props) => props,
  (owned, needed) => isAuthorized(owned, needed),
);
