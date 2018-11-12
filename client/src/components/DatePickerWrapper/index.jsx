import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FieldContainer from '../FieldContainer';

const DatePickerWrapper = ({
  input, label, defaultValue, meta: { touched, error }, ...custom
}) => (
  <FieldContainer>
      <TextField
        fullWidth
        label={label}
        error={touched && error}
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        {...input} {...custom} 
      />
  </FieldContainer>
);

DatePickerWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default DatePickerWrapper;
