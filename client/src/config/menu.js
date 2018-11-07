import { TEACHER, STUDENT, ADMIN } from '../constants/roles';

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
    icon: 'assignment',
    link: '/guide/list',
    text: 'Mis Guias',
    roles: [TEACHER, STUDENT],
  },
  {
    icon: 'person',
    link: '/user',
    text: 'Usuarios',
    roles: [ADMIN],
  },
  {
    icon: 'assignment',
    link: '/signature',
    text: 'Materias',
    roles: [ADMIN],
  },
];
