import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow-y: auto;
`;

const TestCaseTable = ({ testCases = [] }) => (
  <Container>
    <Table>
      <TableBody>
        {testCases.filter(x => x.isPublic).map((testCase, index) => (
          <TableRow key={index}>
            <TableCell>{testCase.name}</TableCell>
            <TableCell>{testCase.arguments.length}</TableCell>
            <TableCell>{testCase.expected}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);

TestCaseTable.propTypes = {
  testCases: PropTypes.array,
};

export default TestCaseTable;
