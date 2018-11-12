import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const PassedIcon = ({ value }) => {
  if (value === 'PASSED') return <Icon style={{ color: '#00897b' }}>check_circle_outline</Icon>;
  if (value === 'NOT_PASSED') return <Icon style={{ color: '#ff511b' }}>remove_circle_outline</Icon>;
  if (value === 'COMPILATION_ERROR') return <Icon style={{ color: '#ff511b' }}>error_outline</Icon>;
  return <Icon style={{ color: '#ff511b' }}>build</Icon>;
};

PassedIcon.propTypes = {
  value: PropTypes.string,
};

export default PassedIcon;
