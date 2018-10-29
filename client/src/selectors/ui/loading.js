import { createSelector } from 'reselect';
import { uiSelector } from './ui';

const baseSelector = createSelector(uiSelector, state => state.loading);

export const showLoadingSelector = createSelector(baseSelector, loading => loading.loading !== 0);
