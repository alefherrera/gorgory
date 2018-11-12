import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_SIGNATURES, GET_SIGNATURE, DELETE_SIGNATURE } from '../../constants';

const initialState = {
  all: [],
  current: {},
};

export default typeToReducer(
  {
    [GET_SIGNATURES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [GET_SIGNATURE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
    [DELETE_SIGNATURE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: state.all.filter(x => x.id !== payload),
      }),
    },
  },
  initialState,
);
