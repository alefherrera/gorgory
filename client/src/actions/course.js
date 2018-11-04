import { createApiAction } from './util';
import { GET_COURSES, SUBSCRIBE_COURSE, UNSUBSCRIBE_COURSE } from '../constants';
import api from '../api/client/course';

export const getCourses = createApiAction(GET_COURSES, api.getAll);
export const subscribeCourse = createApiAction(SUBSCRIBE_COURSE, api.subscribe);
export const unsubscribeCourse = createApiAction(UNSUBSCRIBE_COURSE, api.unsubscribe);
