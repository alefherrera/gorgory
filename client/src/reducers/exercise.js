import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_EXERCISES, GET_EXERCISE } from '../constants';

const initialState = {
  all: [],
  current: {},
};

export default typeToReducer(
  {
    [GET_EXERCISES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: [...state.all, payload],
      }),
    },
    [GET_EXERCISE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
  },
  initialState,
);
