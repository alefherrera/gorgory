import { combineReducers } from 'redux';
import menu from './menu';
import loading from './loading';
import notification from './notification';

export default combineReducers({
  menu,
  loading,
  notification,
});
