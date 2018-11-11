import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import FormComponent from '../../components/FormComponent';

const SignatureForm = props => (
  <FormComponent {...props}>
    <Field name="name" label="Nombre" component={TextFieldWrapper} />
  </FormComponent>
);

export default connect(
  null,
  null,
)(SignatureForm);
