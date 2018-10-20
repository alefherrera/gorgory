import { handleActions } from 'redux-actions';
import { API_FAIL, DISMISS_NOTIFICATION, DISPLAY_NOTIFICATION } from '../../constants';

const initialState = { message: null, show: false, variant: 'success' };

export default handleActions(
  {
    [API_FAIL]: (state, { payload }) => ({
      ...state,
      message: payload,
      show: true,
      variant: 'error',
    }),
    [DISPLAY_NOTIFICATION]: (state, { payload }) => ({
      ...state,
      message: payload,
      show: true,
      variant: 'success',
    }),
    [DISMISS_NOTIFICATION]: state => ({ ...state, show: false }),
  },
  initialState,
);
