import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import PassedIcon from '../PassedIcon';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TextWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
`;

const ResultTable = ({ output = [], onDetailClick }) => (
  <Container>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Valor esperado</TableCell>
          <TableCell>Valor obtenido</TableCell>
          <TableCell>Estado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {output.map((result, index) => (
          <TableRow key={index}>
            <TableCell>{result.testCase.isPublic ? result.testCase.expected : ''}</TableCell>
            <TableCell>
              <TextWrapper onClick={() => onDetailClick(result)}>{result.output}</TextWrapper>
            </TableCell>
            <TableCell>
              <PassedIcon value={result.state} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

ResultTable.propTypes = {
  output: PropTypes.array,
  onDetailClick: PropTypes.func,
};

export default ResultTable;
