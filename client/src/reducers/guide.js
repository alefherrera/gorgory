import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_GUIDES } from '../constants';

const initialState = {
  all: [],
};

export default typeToReducer(
  {
    [GET_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
  },
  initialState,
);
