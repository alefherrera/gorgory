import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from '@material-ui/core';
import FormComponent from '../../components/FormComponent';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import SelectWrapper from '../../components/SelectWrapper';
import { compile } from '../../actions/compile';

class CodeEditor extends Component {
  handleSubmit = (values) => {
    this.props.compile(values);
  };

  render() {
    return (
      <FormComponent
        title="Compilar"
        buttonText="Ejecutar"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Field name="lang" label="Lenguaje" component={SelectWrapper}>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="python">Python</MenuItem>
        </Field>
        <Field name="code" label="Codigo" component={TextFieldWrapper} />
      </FormComponent>
    );
  }
}

CodeEditor.propTypes = {
  handleSubmit: PropTypes.func,
  compile: PropTypes.func,
};

export default connect(
  null,
  { compile },
)(reduxForm({ form: 'compile' })(CodeEditor));
