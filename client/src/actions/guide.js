import { createApiAction } from './util';
import { ADD_GUIDE, GET_GUIDES } from '../constants';
import api from '../api/client/guide';

export const addGuide = createApiAction(ADD_GUIDE, api.add);
export const loadGuides = createApiAction(GET_GUIDES, api.getAll);
