import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import {
  GET_COURSE,
  GET_COURSES,
  SUBSCRIBE_COURSE,
  UNSUBSCRIBE_COURSE,
  GET_SUBSCRIBED_COURSES,
} from '../constants';

const initialState = {
  all: [],
  subscribed: [],
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
    [GET_SUBSCRIBED_COURSES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        subscribed: payload,
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
