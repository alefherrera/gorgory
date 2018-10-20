import { createSelector } from 'reselect';

export const uiSelector = createSelector(state => state.ui, ui => ui);
