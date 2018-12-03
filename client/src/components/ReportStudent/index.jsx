import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Total from './Total';
import Detail from './Detail';
import { SubHeadingText } from '../Generic';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const TotalContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ReportStudent = ({ student }) => (
  <Container>
    <Row>
      <SubHeadingText text={student.student.name} />
      <TotalContainer>
        <SubHeadingText text={<Total total={student.totals} />} />
      </TotalContainer>
    </Row>
    <Row>
      <SubHeadingText text={<Detail detail={student.exercise_results} />} />
    </Row>
  </Container>
);

ReportStudent.propTypes = {
  student: PropTypes.object,
};

export default ReportStudent;
