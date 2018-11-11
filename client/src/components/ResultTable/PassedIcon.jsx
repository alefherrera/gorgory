import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const PassedIcon = ({ value }) => {
  if(value === "PASSED")
    return <Icon style={{ color: '#00897b' }}>thumb_up</Icon>;
  else if(value === "RUNTIME_ERROR")
    return <Icon style={{ color: '#ff511b' }}>thumb_down</Icon>;
  else
    return <Icon style={{ color: '#ff511b' }}>build</Icon>;
}

PassedIcon.propTypes = {
  value: PropTypes.bool,
};

export default PassedIcon;
