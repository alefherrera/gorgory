import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from '@material-ui/core';
import FormComponent from '../../components/FormComponent';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import SelectWrapper from '../../components/SelectWrapper';

class AddTestCasePage extends Component {
  state = {};

  handleSubmit = () => {};

  render() {
    return (
      <FormComponent
        title="Guia"
        buttonText="Guardar"
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

AddTestCasePage.propTypes = {
  handleSubmit: PropTypes.func,
};

export default connect(
  null,
  null,
)(reduxForm({ form: 'addTestCase' })(AddTestCasePage));
