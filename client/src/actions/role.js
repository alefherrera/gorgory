import { createApiAction } from './util';
import { GET_ROLES } from '../constants';
import api from '../api/client/role';

export const getRoles = createApiAction(GET_ROLES, api.getAll);
