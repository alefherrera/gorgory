import typeToReducer from 'type-to-reducer';
import { FULFILLED } from 'redux-promise-middleware';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOGIN, LOGOUT } from '../constants';

const persistConfig = {
  key: 'login',
  storage,
};

const initialState = {
  username: '',
  role: '',
};

const replaceState = () => ({
  [FULFILLED]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
});

export default persistReducer(
  persistConfig,
  typeToReducer(
    {
      [LOGIN]: replaceState(),
      // [REFRESH_TOKEN]: replaceState(),
      [LOGOUT]: () => initialState,
    },
    initialState,
  ),
);
