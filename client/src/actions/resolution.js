import { createApiAction } from './util';
import { UPLOAD_RESOLUTION, GET_LAST_RESOLUTION } from '../constants';
import api from '../api/client/resolution';

export const uploadResolution = createApiAction(UPLOAD_RESOLUTION, api.upload);
export const getLastResolution = createApiAction(GET_LAST_RESOLUTION, api.getLast);
