import typeToReducer from 'type-to-reducer';
import { SET_TEST_TO_EDIT } from '../constants';

const initialState = {
  toEdit: {},
};

export default typeToReducer(
  {
    [SET_TEST_TO_EDIT]: (state, { payload }) => ({
      ...state,
      toEdit: { ...state.toEdit, ...payload },
    }),
  },
  initialState,
);
