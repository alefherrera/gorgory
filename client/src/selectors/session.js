import { createSelector } from 'reselect';
import isAuthorized from '../util/isAuthorized';

export const baseSelector = createSelector(state => state.session, session => session);

export const isAuthenticatedSelector = createSelector(
  baseSelector,
  session => !!session.accessToken,
);

export const usernameSelector = createSelector(baseSelector, session => session.username);

export const accessSelector = createSelector(baseSelector, session => session.role);

export const hasAccessSelector = createSelector(
  accessSelector,
  (state, props) => props,
  (owned, needed) => isAuthorized(owned, needed),
);
