import React from 'react';
import PropTypes from 'prop-types';
import Total from './Total';
import Detail from './Detail';

const ReportStudent = ({ student }) => (
  <div>
    {student.student.name}
    <Total total={student.total} />
    <Detail detail={student.exercise_results} />
  </div>
);

ReportStudent.propTypes = {
  student: PropTypes.object,
};

export default ReportStudent;
