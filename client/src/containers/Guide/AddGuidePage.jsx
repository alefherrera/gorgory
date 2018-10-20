import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import FormComponent from '../../components/FormComponent';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import SelectWrapper from '../../components/SelectWrapper';
import { addGuide } from '../../actions/guide';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  flex-direction: row;
  margin: 20px;
`;

const Col = styled.div`
  flex-direction: column;
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Header = ({ title, onClick }) => (
  <Col>
    <DeleteButton>
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </DeleteButton>
    <Typography variant="subheading" gutterBottom>
      {title}
    </Typography>
  </Col>
);

const Argument = ({ fields }) => (
  <Row>
    <Container>
      <Button variant="raised" color="primary" onClick={() => fields.push({})}>
        Agregar argumento
      </Button>
    </Container>
    {fields.map((argument, index) => (
      <Row key={index}>
        <Header title={`Argumento ${index + 1}`} onClick={() => fields.remove(index)} />
        <Field name={`${argument}.value`} type="text" component={TextFieldWrapper} label="Valor" />
      </Row>
    ))}
  </Row>
);

const TestCase = ({ fields }) => (
  <Row>
    <Container>
      <Button variant="raised" color="primary" onClick={() => fields.push({})}>
        Agregar caso de prueba
      </Button>
    </Container>
    {fields.map((testCase, index) => (
      <Row key={index}>
        <Header title={`Caso de prueba ${index + 1}`} onClick={() => fields.remove(index)} />
        <Field
          name={`${testCase}.signature`}
          type="text"
          component={TextFieldWrapper}
          label="Firma"
        />
        <FieldArray name={`${testCase}.arguments`} component={Argument} />
        <Field
          name={`${testCase}.expected`}
          type="text"
          component={TextFieldWrapper}
          label="Valor Esperado"
        />
      </Row>
    ))}
  </Row>
);

const Exercise = ({ fields }) => (
  <Row>
    <Row>
      <Container>
        <Button variant="raised" color="primary" onClick={() => fields.push({})}>
          Agregar ejercicio
        </Button>
      </Container>
    </Row>
    <Card>
      {fields.map((exercise, index) => (
        <Row key={index}>
          <Header title={`Ejercicio ${index + 1}`} onClick={() => fields.remove(index)} />
          <Field
            name={`${exercise}.firstName`}
            type="text"
            component={TextFieldWrapper}
            label="Enunciado"
          />
          <FieldArray name={`${exercise}.testCases`} component={TestCase} />
        </Row>
      ))}
    </Card>
  </Row>
);

class AddGuidePage extends Component {
  handleSubmit = (values) => {
    this.props.addGuide(values);
  };

  render() {
    return (
      <FormComponent
        title="Guia"
        buttonText="Crear"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Field name="language" label="Lenguaje" component={SelectWrapper}>
          <MenuItem value="JAVA">Java</MenuItem>
          <MenuItem value="PYTHON">Python</MenuItem>
        </Field>
        <Field name="name" label="Nombre" component={TextFieldWrapper} />
        <FieldArray name="exercises" component={Exercise} />
      </FormComponent>
    );
  }
}

AddGuidePage.propTypes = {
  handleSubmit: PropTypes.func,
  addGuide: PropTypes.func,
};

export default connect(
  null,
  { addGuide },
)(reduxForm({ form: 'addGuide' })(AddGuidePage));