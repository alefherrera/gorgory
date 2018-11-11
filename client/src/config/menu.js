import { TEACHER, STUDENT } from '../constants/roles';

export default [
  {
    icon: 'add-circle-outline',
    link: '/guide/add',
    text: 'Nueva Guia',
    roles: [TEACHER],
  },
  {
    icon: 'search',
    link: '/guide/search',
    text: 'Buscar Guia',
    roles: [STUDENT],
  },
  {
    icon: 'description',
    link: '/guide/list',
    text: 'Mis Guias',
    roles: [TEACHER, STUDENT],
  },
  {
    icon: 'assignment',
    link: '/course/list',
    text: 'Cursos',
    roles: [TEACHER, STUDENT],
  },
];
