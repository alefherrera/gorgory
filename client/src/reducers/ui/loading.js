import { handleActions } from 'redux-actions';
import {
  API_LOADING, API_FAIL, API_SUCCESS, CLEAR_ERROR,
} from '../../constants';

const initialState = { loading: 0, error: null };

export default handleActions(
  {
    [API_LOADING]: state => ({ ...state, loading: state.loading + 1, error: null }),
    [API_FAIL]: (state, action) => ({
      ...state,
      loading: Math.max(state.loading - 1, 0),
      error: action.payload,
    }),
    [API_SUCCESS]: state => ({ ...state, loading: Math.max(state.loading - 1, 0), error: null }),
    [CLEAR_ERROR]: () => initialState,
  },
  initialState,
);
