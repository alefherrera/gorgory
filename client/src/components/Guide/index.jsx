import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import { Icon, IconButton } from '@material-ui/core';
import styled from 'styled-components';

const Row = styled.div``;

export const ExerciseRows = ({ number, tests }) => (
  <div>
    {`${number} ${tests}`}
    <Divider />
  </div>
);

const StyledCard = styled(Card)`
  margin-top: 32px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)``;

const StyledCardActions = styled(CardActions)`
  display: flex;
  flex-direction: row-reverse;
  margin: 12px;
`;

export const NewExercisesTable = ({ label, exercisesRows }) => (
  <StyledCard>
    <StyledCardContent>
      <Table>
        <TableHead>
          {label}
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell># Tests</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {exercisesRows.map((ex, index) => (
            <TableRow key={index}>
              <TableCell>{ex.number}</TableCell>
              <TableCell>{ex.tests}</TableCell>
              <TableCell>
                <IconButton onClick={ex.edit}>
                  <Icon style={{ color: '#00897b' }}>edit</Icon>
                </IconButton>
                <IconButton onClick={ex.delete}>
                  <Icon style={{ color: '#ff511b' }}>delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledCardContent>
    <StyledCardActions>
      <StyledButton variant="fab" color="primary" aria-label="Add">
        <AddIcon />
      </StyledButton>
    </StyledCardActions>
  </StyledCard>
);