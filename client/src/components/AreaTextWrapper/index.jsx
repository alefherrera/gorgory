import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FieldContainer from "../FieldContainer";

const AreaTextWrapper = ({
  input,
  label,
  rows,
  rowsMax,
  meta: { touched, error },
  ...custom
}) => (
  <FieldContainer>
    <TextField
      multiline={true}
      rows={rows}
      rowsMax={rowsMax}
      fullWidth
      label={label}
      error={touched && error}
      {...input}
      {...custom}
    />
  </FieldContainer>
);

AreaTextWrapper.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.object
};

export default AreaTextWrapper;
