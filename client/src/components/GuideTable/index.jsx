import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { Icon, IconButton } from '@material-ui/core';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const GuideTable = ({ guides = [] }) => (
  <Container>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Ejercicios</TableCell>
          <TableCell>Fecha Modificación</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {guides.map((guide, index) => (
          <TableRow key={index}>
            <TableCell>{guide.name}</TableCell>
            <TableCell>{guide.exercicesCount}</TableCell>
            <TableCell>{guide.modifiedDate}</TableCell>
            <TableCell>
              <IconButton>
                <Icon color="green">edit</Icon>
              </IconButton>
              <IconButton>
                <Icon color="red">delete</Icon>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

GuideTable.propTypes = {
  guides: PropTypes.object,
};

export default GuideTable;
