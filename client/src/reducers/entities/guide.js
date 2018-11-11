import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import {
  GET_GUIDES, GET_ALL_GUIDES, SEARCH_GUIDES, GET_GUIDE, DELETE_GUIDE, 
} from '../../constants';

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
    [GET_ALL_GUIDES]: {
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
    [DELETE_GUIDE]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: state.all.filter(x => x.id !== payload),
      }),
    },
  },
  initialState,
);
