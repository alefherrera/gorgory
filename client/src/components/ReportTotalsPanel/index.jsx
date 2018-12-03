import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SubHeadingText } from '../Generic';

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
  margin-top: 12px;
`;

const Row = styled.div`
  width: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
  height: ${props => props.height || '100%'};
  justify-content: ${props => props.align || 'left'};
`;

const ReportTotalsPanel = ({ mostFailedExercise = {}, mostUnknownExercise = {} }) => (
  <Container>
    <InnerContainer>
      <Row align="center">Ejercicio con mas errores</Row>
      <Row align="center">
        <SubHeadingText
          text={mostFailedExercise.exercise && mostFailedExercise.exercise.description}
        />
      </Row>
    </InnerContainer>
    <InnerContainer>
      <Row align="center">Ejercicio con menos resoluciones</Row>
      <Row align="center">
        <SubHeadingText
          text={mostUnknownExercise.exercise && mostUnknownExercise.exercise.description}
        />
      </Row>
    </InnerContainer>
  </Container>
);

ReportTotalsPanel.propTypes = {
  mostFailedExercise: PropTypes.object,
  mostUnknownExercise: PropTypes.object,
};

export default ReportTotalsPanel;
