import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import reducers from '../reducers';
import middlewares from '../middlewares';

const storeCreator = applyMiddleware(...middlewares)(createStore);

export const store = storeCreator(
  connectRouter(history)(reducers) /* preloadedState, */,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const persistor = persistStore(store);
