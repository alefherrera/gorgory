import { combineReducers } from 'redux';
import guide from './guide';
import user from './user';
import role from './role';

export default combineReducers({
  guide,
  user,
  role,
});
