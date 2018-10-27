import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { Field, FieldArray, reduxForm } from 'redux-form';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import FormComponent from '../../components/FormComponent';
import { RootFlexColumn, TitleText, StyledForm } from '../../components/Generic';

class AddGuidePage extends Component {
  state = {};

  render() {
    return (
      <RootFlexColumn>
        <TitleText text="Nueva Guia" />
        <Divider />
        <StyledForm>
          <Field name="name" label="Nombre" component={TextFieldWrapper} />
        </StyledForm>
      </RootFlexColumn>
    );
  }
}

export default connect(
  null,
  {},
)(reduxForm({ form: 'addGuide' })(AddGuidePage));
