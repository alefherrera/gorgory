import { createApiAction } from './util';
import { GET_ROLES } from '../constants';
import api from '../api/client/user';

export const getRoles = createApiAction(GET_ROLES, api.getAll);
