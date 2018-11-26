import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import AddIcon from '@material-ui/icons/Add';
import { Icon, IconButton, Paper } from '@material-ui/core';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';

export const ExerciseRows = ({ number, tests }) => (
  <div>
    {`${number} ${tests}`}
    <Divider />
  </div>
);

const StyledCard = styled(Card)`
  overflow-y: scroll;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const StyledButton = styled(Button)``;

const StyledCardActions = styled(CardActions)`
  display: flex;
  flex-direction: row-reverse;
  margin: 6px;
`;

export const NewExercisesTable = ({
  label, exercisesRows, buttonsProvider, children,
}) => (
  <Paper style={{ maxHeight: 200, overflow: 'auto', marginTop: '32px' }}>
    <StyledCard>
      <StyledCardContent>
        {label}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numero</TableCell>
              <TableCell># Tests</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {exercisesRows.map((ex, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ex.testCases.length}</TableCell>
                {<TableCell>{buttonsProvider ? buttonsProvider(ex.id) : undefined}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledCardContent>
      <StyledCardActions>{children}</StyledCardActions>
    </StyledCard>
  </Paper>
);

export const NewTestTable = ({
  buttonsProvider, label, testRows, onClick,
}) => (
  <Paper style={{ maxHeight: 200, overflow: 'auto', marginTop: '32px' }}>
    <StyledCard>
      <StyledCardContent>
        {label}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test #</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {testRows.map((ex, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ex.name}</TableCell>
                <TableCell>{buttonsProvider ? buttonsProvider(index) : undefined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledCardContent>
      <StyledCardActions>
        <StyledButton onClick={onClick} variant="fab" color="primary" aria-label="Add">
          <AddIcon />
        </StyledButton>
      </StyledCardActions>
    </StyledCard>
  </Paper>
);
