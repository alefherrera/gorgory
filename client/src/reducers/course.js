import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_COURSES } from '../constants';

const initialState = {
  all: [],
};

export default typeToReducer(
  {
    [GET_COURSES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
  },
  initialState,
);
