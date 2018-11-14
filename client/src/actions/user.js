import createAction from 'redux-actions/lib/createAction';
import { createApiAction } from './util';
import {
  ADD_USER, EDIT_USER, DELETE_USER, GET_USERS, GET_USER, FILTER_USERS,
} from '../constants';
import api from '../api/client/user';

export const addUser = createApiAction(ADD_USER, api.add);
export const editUser = createApiAction(EDIT_USER, api.edit);
export const deleteUser = createApiAction(DELETE_USER, api.delete);
export const getUsers = createApiAction(GET_USERS, api.getAll);
export const getUser = createApiAction(GET_USER, api.get);
export const filterUsers = createAction(FILTER_USERS);
