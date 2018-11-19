import PropTypes, { object } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import GorgoryTable from '../GorgoryTable';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const columns = iconsRenderer => [
  {
    name: 'Materia',
    options: {
      filter: true,
    },
  },
  {
    name: 'Comisión',
    options: {
      filter: true,
    },
  },
  {
    name: 'Profesores',
    options: {
      filter: false,
    },
  },
  {
    name: '',
    options: {
      filter: true,
      customBodyRender: value => iconsRenderer(value),
    },
  },
];

const adaptCourses = courses => courses.map(course => [
  course.signature && course.signature.name,
  course.name,
  course.teachers
      && course.teachers.reduce((prev, next) => `${prev + next.name}, `, '').slice(0, -2),
  course,
]);

const CourseTable = ({ courses = [], iconsRenderer = () => {} }) => (
  <Container>
    <GorgoryTable data={adaptCourses(courses)} columns={columns(iconsRenderer)} />
  </Container>
);

CourseTable.propTypes = {
  courses: PropTypes.arrayOf(object),
  iconsRenderer: PropTypes.func,
};

export default CourseTable;
