import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_GUIDES, SEARCH_GUIDES, GET_GUIDE } from '../constants';

const initialState = {
  all: [],
  search: [],
  current: {},
};

export default typeToReducer(
  {
    [GET_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
    [SEARCH_GUIDES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        search: payload,
      }),
    },
    [GET_GUIDE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        current: payload,
      }),
    },
  },
  initialState,
);
