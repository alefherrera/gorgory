import { createApiAction } from './util';
import { COMPILE } from '../constants';
import api from '../api/client/compile';

export const compile = createApiAction(COMPILE, api.compile);
