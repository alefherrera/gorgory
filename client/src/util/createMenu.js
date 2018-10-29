import omit from 'lodash/omit';
import includes from 'lodash/includes';
import menu from '../config/menu';

export default role => menu.filter(x => includes(x.roles, role)).map(x => omit(x, 'roles'));
