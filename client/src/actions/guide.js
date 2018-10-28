import { createApiAction } from './util';
import { ADD_GUIDE } from '../constants';
import api from '../api/client/guide';

export const addGuide = createApiAction(ADD_GUIDE, api.add);
