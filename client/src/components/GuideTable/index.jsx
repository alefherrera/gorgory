import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Moment from 'react-moment';
import { DATETIME_FORMAT } from '../../constants/date';

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
          <TableCell>Vigencia</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {guides.map((guide, index) => (
          <TableRow key={index}>
            <TableCell>{guide.name}</TableCell>
            <TableCell>{guide.exercises.length}</TableCell>
            <TableCell>
              <Moment format={DATETIME_FORMAT} date={guide.updateDateTime} />
            </TableCell>
            <TableCell>
              <Moment format={DATETIME_FORMAT} date={guide.start} />
              {' '}
-
              {' '}
              <Moment format={DATETIME_FORMAT} date={guide.end} />
            </TableCell>
            <TableCell>{iconsRenderer(guide)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

GuideTable.propTypes = {
  guides: PropTypes.arrayOf(PropTypes.object),
  iconsRenderer: PropTypes.func,
};

export default GuideTable;
