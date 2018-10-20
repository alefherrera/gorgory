import { createAction } from 'redux-actions';
import { DISPLAY_NOTIFICATION, DISMISS_NOTIFICATION } from '../constants';
import delay from '../util/delay';

export const displayNotification = (...params) => (dispatch) => {
  dispatch(createAction(DISPLAY_NOTIFICATION)(...params));
  return delay(500);
};
export const dismissNotification = createAction(DISMISS_NOTIFICATION);
