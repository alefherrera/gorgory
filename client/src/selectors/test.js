import { createSelector } from 'reselect';

const baseSelector = createSelector(state => state.test, test => test);

export const testToEditSelector = createSelector(baseSelector, test => test.toEdit);
