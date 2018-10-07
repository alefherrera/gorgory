import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.router, router => router);

export const locationSelector = createSelector(baseSelector, router => router.location || {});
export const stateSelector = createSelector(locationSelector, location => location.state || '');
