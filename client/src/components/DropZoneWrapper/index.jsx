import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import FieldContainer from '../FieldContainer';

const TextFieldWrapper = ({ input, label, ...custom }) => (
  <FieldContainer>
    <Dropzone multiple={false} onDrop={input.onChange} {...input} {...custom}>
      {label}
    </Dropzone>
  </FieldContainer>
);

TextFieldWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default TextFieldWrapper;
