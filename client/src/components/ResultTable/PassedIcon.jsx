import React from 'react';
import PropTypes from 'prop-types';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

const PassedIcon = ({ value }) => (value ? <ThumbUp /> : <ThumbDown />);

PassedIcon.propTypes = {
  value: PropTypes.bool,
};

export default PassedIcon;
