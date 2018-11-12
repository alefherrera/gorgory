import React from 'react';
import PropTypes, { object } from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const CourseTable = ({ courses = [], iconsRenderer = () => {} }) => (
  <Container>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Materia</TableCell>
          <TableCell>Comisión</TableCell>
          <TableCell>Profesores</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course.signature && course.signature.name}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>
              {course.teachers
                && course.teachers.reduce((prev, next) => `${prev + next.name}, `, '').slice(0, -2)}
            </TableCell>
            <TableCell>{iconsRenderer(course)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

CourseTable.propTypes = {
  courses: PropTypes.arrayOf(object),
  iconsRenderer: PropTypes.func,
};

export default CourseTable;
