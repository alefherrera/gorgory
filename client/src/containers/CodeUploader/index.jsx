import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormComponent from '../../components/FormComponent';
import DropZoneWrapper from '../../components/DropZoneWrapper';
import { uploadResolution } from '../../actions/resolution';
import OutputLogger from '../OutputLogger';

class CodeUploader extends Component {
  handleSubmit = (values) => {
    const [file] = values.file;
    // eslint-disable-next-line
    values.file = file;
    this.props.uploadResolution(values);
  };

  render() {
    return (
      <div>
        <FormComponent
          title="Resolucion"
          buttonText="Ejecutar"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          <Field name="file" label="Codigo" component={DropZoneWrapper} />
        </FormComponent>
        <OutputLogger />
      </div>
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
