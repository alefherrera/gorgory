import React from 'react';
import PropTypes from 'prop-types';

const ReportHeader = ({ title }) => <div>{title}</div>;

ReportHeader.propTypes = {
  title: PropTypes.string,
};

export default ReportHeader;
