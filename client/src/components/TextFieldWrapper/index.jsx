import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FieldContainer from '../FieldContainer';

const TextFieldWrapper = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <FieldContainer>
    <TextField label={label} error={touched && error} {...input} {...custom} />
  </FieldContainer>
);

TextFieldWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default TextFieldWrapper;
