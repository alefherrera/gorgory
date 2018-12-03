import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { COLOR_ERROR, COLOR_UNKNOWN } from '../../constants/color';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-top: 12px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 6px;
`;

const Row = styled.div`
  margin-top: 6px;
  margin-bottom: 6px;
  height: ${props => props.height || '100%'};
  align-self: ${props => props.align || 'left'};
`;

const ReportTotalsPanel = ({ mostFailedExercise = {}, mostUnknownExercise = {} }) => (
  <Container>
    <InnerContainer>
      <Row align="center">Ejercicio con mas errores</Row>
      <Row align="center">
        <Avatar style={{ 'background-color': COLOR_ERROR }}>
          {mostFailedExercise.totals && mostFailedExercise.totals.error}
        </Avatar>
      </Row>
      <Row align="center">
        {mostFailedExercise.exercise && mostFailedExercise.exercise.description}
      </Row>
    </InnerContainer>
    <InnerContainer>
      <Row align="center">Ejercicio con menos resoluciones</Row>
      <Row align="center">
        <Avatar style={{ 'background-color': COLOR_UNKNOWN }}>
          {mostUnknownExercise.totals && mostUnknownExercise.totals.error}
        </Avatar>
      </Row>
      <Row align="center">
        {mostUnknownExercise.exercise && mostUnknownExercise.exercise.description}
      </Row>
    </InnerContainer>
  </Container>
);

ReportTotalsPanel.propTypes = {
  mostFailedExercise: PropTypes.object,
  mostUnknownExercise: PropTypes.object,
};

export default ReportTotalsPanel;
