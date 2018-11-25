import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { UPLOAD_RESOLUTION, GET_LAST_RESOLUTION, GET_RESOLUTION_HISTORY } from '../constants';

const initialState = {
  last: undefined,
  history: [],
};

export default typeToReducer(
  {
    [UPLOAD_RESOLUTION]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        ...payload,
      }),
    },
    [GET_LAST_RESOLUTION]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        last: payload,
      }),
    },
    [GET_RESOLUTION_HISTORY]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        history: payload,
      }),
    },
  },
  initialState,
);
