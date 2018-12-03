import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import {
  GET_USERS, DELETE_USER, GET_USER, FILTER_USERS,
} from '../../constants';

const initialState = {
  all: [],
  current: {},
  filter: '',
};

export default typeToReducer(
  {
    [GET_USERS]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [GET_USER]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
    [DELETE_USER]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: state.all.filter(x => x.id !== payload),
      }),
    },
    [FILTER_USERS]: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
  },
  initialState,
);
