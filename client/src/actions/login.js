import { createApiAction } from './util';
import { LOGIN } from '../constants';
import api from '../api/client/login';

export const login = createApiAction(LOGIN, api.login);
// export const refreshToken = createApiAction(REFRESH_TOKEN, api.refresh);
