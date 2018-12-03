import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Icon from '@material-ui/core/Icon';
import join from 'lodash/join';

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
    <Stepper activeStep={2}>
      <Step>
        <StepLabel>Ingresa</StepLabel>
      </Step>
      <Step>
        <StepLabel>Espera</StepLabel>
      </Step>
    </Stepper>
    {testCases.filter(x => x.isPublic).map((testCase, index) => (
      <Stepper key={index} activeStep={2}>
        <Step>
          <StepLabel StepIconComponent={() => <Icon>code</Icon>}>
            {testCase.arguments.length
              ? join(testCase.arguments.map(x => x.value), ', ')
              : 'Sin valor de entrada'}
          </StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={() => <Icon>chevron_right</Icon>}>
            {testCase.expected}
          </StepLabel>
        </Step>
      </Stepper>
    ))}
  </Container>
);

TestCaseTable.propTypes = {
  testCases: PropTypes.array,
};

export default TestCaseTable;
