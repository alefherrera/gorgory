import React from 'react';
import PropTypes from 'prop-types';
import ReportStudent from '../ReportStudent';
import ReportChart from '../ReportChart';

const ReportCourse = ({ course }) => (
  <div>
    {course.name}
    {course.students.map((student, i) => (
      <ReportStudent key={i} student={student} />
    ))}
    <ReportChart />
  </div>
);

ReportCourse.propTypes = {
  course: PropTypes.object,
};

export default ReportCourse;
