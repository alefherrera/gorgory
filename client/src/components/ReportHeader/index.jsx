import React from 'react';
import PropTypes from 'prop-types';
import { TitleText } from '../Generic';

const ReportHeader = ({ title }) => <TitleText text={title} />;

ReportHeader.propTypes = {
  title: PropTypes.string,
};

export default ReportHeader;
