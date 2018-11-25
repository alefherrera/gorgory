import { createApiAction } from './util';
import { UPLOAD_RESOLUTION, GET_LAST_RESOLUTION, GET_RESOLUTION_HISTORY } from '../constants';
import api from '../api/client/resolution';

export const uploadResolution = createApiAction(UPLOAD_RESOLUTION, api.upload);
export const getLastResolution = createApiAction(GET_LAST_RESOLUTION, api.getLast);
export const getResolutionHistory = createApiAction(GET_RESOLUTION_HISTORY, api.getHistory);
