import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from '../history';

export default [thunk, promiseMiddleware(), routerMiddleware(history)];
