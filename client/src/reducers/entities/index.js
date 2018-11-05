import { combineReducers } from 'redux';
import guide from './guide';
import user from './user';

export default combineReducers({
  guide,
  user,
});
