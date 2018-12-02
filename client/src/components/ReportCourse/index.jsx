import React from 'react';
import PropTypes from 'prop-types';
import ReportStudent from '../ReportStudent';
import ReportChart from '../ReportChart';
import { SubtitleTitleText } from '../Generic';

const ReportCourse = ({ course }) => (
  <div>
    <SubtitleTitleText text={course.name} />
    {course.students.map((student, i) => (
      <ReportStudent key={i} student={student} />
    ))}
    <ReportChart data={course.totals} />
  </div>
);

ReportCourse.propTypes = {
  course: PropTypes.object,
};

export default ReportCourse;
