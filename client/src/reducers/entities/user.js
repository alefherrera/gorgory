import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_USERS, DELETE_USER, GET_USER } from '../../constants';

const initialState = {
  all: [],
  current: {},
};

export default typeToReducer(
  {
    [GET_USERS]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload.map(x => ({ ...x, id: x.username })),
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
  },
  initialState,
);