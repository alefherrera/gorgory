import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from '../SearchBox';
import FieldContainer from '../FieldContainer';

const SearchBoxWrapper = ({
  input, label, meta: { touched, error }, ...custom
}) => (
  <FieldContainer>
    <SearchBox fullWidth label={label} error={touched && error} {...input} {...custom} />
  </FieldContainer>
);

SearchBoxWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object,
};

export default SearchBoxWrapper;
