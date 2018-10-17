import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { MenuItem } from '@material-ui/core';
import FormComponent from '../../components/FormComponent';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import SelectWrapper from '../../components/SelectWrapper';

class AddGuidePage extends Component {
  handleSubmit = () => {};

  renderExercise = ({ fields }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Agregar ejercicio
        </button>
      </li>
      {fields.map((exercise, index) => (
        <li key={index}>
          <button type="button" onClick={() => fields.remove(index)}>
            Eliminar
          </button>
          <h4>{`Ejercicio ${index + 1}`}</h4>
          <Field
            name={`${exercise}.firstName`}
            type="text"
            component={TextFieldWrapper}
            label="Enunciado"
          />
          <FieldArray name={`${exercise}.testCases`} component={this.renderTestCase} />
        </li>
      ))}
    </ul>
  );

  renderTestCase = ({ fields }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Agregar caso de prueba
        </button>
      </li>
      {fields.map((testCase, index) => (
        <li key={index}>
          <button type="button" onClick={() => fields.remove(index)}>
            Eliminar
          </button>
          <Field
            name={`${testCase}.expected`}
            type="text"
            component={TextFieldWrapper}
            label="Esperado"
          />
          <Field
            name={`${testCase}.signature`}
            type="text"
            component={TextFieldWrapper}
            label="Firma"
          />
          <FieldArray name={`${testCase}.arguments`} component={this.renderArgument} />
        </li>
      ))}
    </ul>
  );

  renderArgument = ({ fields }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Agregar argumento
        </button>
      </li>
      {fields.map((argument, index) => (
        <li key={index}>
          <button type="button" onClick={() => fields.remove(index)}>
            Eliminar
          </button>
          <Field
            name={`${argument}.value`}
            type="text"
            component={TextFieldWrapper}
            label="Valor"
          />
        </li>
      ))}
    </ul>
  );

  render() {
    return (
      <FormComponent
        title="Guia"
        buttonText="Guardar"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Field name="lang" label="Lenguaje" component={SelectWrapper}>
          <MenuItem value="JAVA">Java</MenuItem>
          <MenuItem value="PYTHON">Python</MenuItem>
        </Field>
        <Field name="name" label="Nombre" component={TextFieldWrapper} />
        <FieldArray name="exercises" component={this.renderExercise} />
      </FormComponent>
    );
  }
}

AddGuidePage.propTypes = {
  handleSubmit: PropTypes.func,
};

export default connect(
  null,
  null,
)(reduxForm({ form: 'addGuide' })(AddGuidePage));
