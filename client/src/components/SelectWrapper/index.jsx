import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FieldContainer from '../FieldContainer';

const Control = styled(FormControl)`
  width: 100%;
`;

const SelectWrapper = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <FieldContainer>
    <Control>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        error={touched && error}
        {...input}
        onChange={event => input.onChange(event.target.value)}
        {...custom}
      />
    </Control>
  </FieldContainer>
);

SelectWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default SelectWrapper;
