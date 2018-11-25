import typeToReducer from 'type-to-reducer';
import { SET_ROUTE_FLOW } from '../constants';

const initialState = {};

export default typeToReducer(
  {
    [SET_ROUTE_FLOW]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState,
);
