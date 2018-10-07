import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SwitchWrapper = ({ input, label }) => (
  <FormControlLabel
    control={<Switch checked={!!input.value} onChange={input.onChange} />}
    label={label}
  />
);

SwitchWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
};

export default SwitchWrapper;
