import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

const LoadingIndicator = ({ show }) => (show ? <LinearProgress color="secondary" /> : <div style={{ height: 5 }} />);

LoadingIndicator.propTypes = {
  show: PropTypes.bool,
};

export default LoadingIndicator;
