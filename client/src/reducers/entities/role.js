import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { GET_ROLES } from '../../constants';

const initialState = {
  all: [],
};

export default typeToReducer(
  {
    [GET_ROLES]: {
      [FULFILLED]: (state, { payload }) => ({
        ...state,
        all: payload,
      }),
    },
  },
  initialState,
);
