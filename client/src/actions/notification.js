import { createAction } from 'redux-actions';
import { DISPLAY_NOTIFICATION, DISMISS_NOTIFICATION } from '../constants';
import delay from '../util/delay';

const displayNotificationAction = createAction(DISPLAY_NOTIFICATION);

export const displayNotification = (...params) => (dispatch) => {
  dispatch(displayNotificationAction(...params));
  return delay(500);
};
export const dismissNotification = createAction(DISMISS_NOTIFICATION);
