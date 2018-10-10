import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from '@material-ui/core';
import FormComponent from '../../components/FormComponent';
import DropZoneWrapper from '../../components/DropZoneWrapper';
import SelectWrapper from '../../components/SelectWrapper';
import { uploadResolution } from '../../actions/resolution';

class CodeUploader extends Component {
  handleSubmit = (values) => {
    const [file] = values.file;
    // eslint-disable-next-line
    values.file = file;
    this.props.uploadResolution(values);
  };

  render() {
    return (
      <FormComponent
        title="Resolucion"
        buttonText="Ejecutar"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Field name="lang" label="Lenguaje" component={SelectWrapper}>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="python">Python</MenuItem>
        </Field>
        <Field name="file" label="Codigo" component={DropZoneWrapper} />
      </FormComponent>
    );
  }
}

CodeUploader.propTypes = {
  handleSubmit: PropTypes.func,
  uploadResolution: PropTypes.func,
};

export default connect(
  null,
  { uploadResolution },
)(reduxForm({ form: 'resolution' })(CodeUploader));
