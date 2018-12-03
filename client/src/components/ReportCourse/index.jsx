import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReportStudent from '../ReportStudent';
import ReportChart from '../ReportChart';
import { SubtitleTitleText } from '../Generic';

const Container = styled.div`
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

const ReportCourse = ({ course }) => (
  <Container>
    <Row>
      <SubtitleTitleText text={course.name} />
    </Row>
    <Row>
      {course.students.map((student, i) => (
        <ReportStudent key={i} student={student} />
      ))}
    </Row>
    <Row>
      <ReportChart data={course.totals} />
    </Row>
  </Container>
);

ReportCourse.propTypes = {
  course: PropTypes.object,
};

export default ReportCourse;
