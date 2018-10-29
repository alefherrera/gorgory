import { createSelector } from 'reselect';
import { uiSelector } from './ui';

const baseSelector = createSelector(uiSelector, state => state.notification);

export const notificationMessageSelector = createSelector(
  baseSelector,
  notification => notification.message,
);

export const notificationShowSelector = createSelector(
  baseSelector,
  notification => notification.show,
);

export const notificationVariantSelector = createSelector(
  baseSelector,
  notification => notification.variant,
);
