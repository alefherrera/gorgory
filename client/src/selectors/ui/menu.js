import { createSelector } from 'reselect';
import { uiSelector } from './ui';

const baseSelector = createSelector(uiSelector, state => state.menu);

export const menuOpenSelector = createSelector(baseSelector, menu => menu.open);
