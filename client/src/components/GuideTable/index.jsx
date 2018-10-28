import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const GuideTable = ({ guides = [], iconsRenderer = () => {} }) => (
  <Container>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Ejercicios</TableCell>
          <TableCell>Fecha Modificación</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {guides.map((guide, index) => (
          <TableRow key={index}>
            <TableCell>{guide.name}</TableCell>
            <TableCell>{guide.exercises.length}</TableCell>
            <TableCell>{guide.updateDateTime}</TableCell>
            <TableCell>{iconsRenderer(guide)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

GuideTable.propTypes = {
  guides: PropTypes.object,
  iconsRenderer: PropTypes.func,
};

export default GuideTable;
