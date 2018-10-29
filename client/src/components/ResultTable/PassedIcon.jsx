import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const PassedIcon = ({ value }) => (value ? (
  <Icon style={{ color: '#00897b' }}>thump_up</Icon>
) : (
  <Icon style={{ color: '#ff511b' }}>thump_down</Icon>
));

PassedIcon.propTypes = {
  value: PropTypes.bool,
};

export default PassedIcon;
