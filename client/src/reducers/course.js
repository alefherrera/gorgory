import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import {
  GET_COURSE, GET_COURSES, SUBSCRIBE_COURSE, UNSUBSCRIBE_COURSE,
} from '../constants';

const initialState = {
  all: [],
  current: {},
};

export default typeToReducer(
  {
    [GET_COURSE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
    [GET_COURSES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [SUBSCRIBE_COURSE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
    [UNSUBSCRIBE_COURSE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
  },
  initialState,
);
