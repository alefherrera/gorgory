import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import PassedIcon from './PassedIcon';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ResultTable = ({ output }) =>
    (
        <Container>
            <Table
                fixedHeader
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Test #</TableCell>
                        <TableCell>Expected</TableCell>
                        <TableCell>Output</TableCell>
                        <TableCell>Passed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {output && (output.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{result.testCase.expected}</TableCell>
                            <TableCell>{result.output}</TableCell>
                            <TableCell><PassedIcon value={result.passed} /></TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </Container>
    );

ResultTable.propTypes = {
    output: PropTypes.object,
};

export default ResultTable;
