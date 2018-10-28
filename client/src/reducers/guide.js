import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_GUIDES, SEARCH_GUIDES } from '../constants';

const initialState = {
  all: [],
  search: [],
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
  },
  initialState,
);
