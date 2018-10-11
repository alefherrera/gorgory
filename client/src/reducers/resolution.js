import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { UPLOAD_RESOLUTION } from '../constants';

const initialState = {};

export default typeToReducer(
  {
    [UPLOAD_RESOLUTION]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        ...payload,
      }),
    },
  },
  initialState,
);
