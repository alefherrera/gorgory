import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const PassedIcon = ({ value }) => (value ? (
  <Icon style={{ color: '#00897b' }}>thumb_up</Icon>
) : (
  <Icon style={{ color: '#ff511b' }}>thumb_down</Icon>
));

PassedIcon.propTypes = {
  value: PropTypes.bool,
};

export default PassedIcon;
