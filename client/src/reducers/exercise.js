import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_EXERCISES } from '../constants';

const initialState = {
  all: [],
};

export default typeToReducer(
  {
    [GET_EXERCISES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: [...state.all, payload],
      }),
    },
  },
  initialState,
);
