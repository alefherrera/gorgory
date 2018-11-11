import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import FormComponent from '../../components/FormComponent';
import { required } from '../../util/validations';

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
        <Icon>delete</Icon>
      </IconButton>
    </DeleteButton>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
  </Col>
);

const Course = ({ fields }) => (
  <Row>
    <Row>
      <Container>
        <Button variant="contained" color="primary" onClick={() => fields.push({})}>
          Agregar Comision
        </Button>
      </Container>
    </Row>
    <Card>
      {fields.map((course, index) => (
        <Row key={index}>
          <Header title={`Comision ${index + 1}`} onClick={() => fields.remove(index)} />
          <Field
            name={`${course}.name`}
            type="text"
            component={TextFieldWrapper}
            label="Nombre"
            validate={[required]}
          />
          <Field
            name={`${course}.description`}
            type="text"
            component={TextFieldWrapper}
            label="Descripcion"
            validate={[required]}
          />
        </Row>
      ))}
    </Card>
  </Row>
);

const SignatureForm = props => (
  <FormComponent {...props}>
    <Field name="name" label="Nombre" component={TextFieldWrapper} />
    <FieldArray name="courses" component={Course} />
  </FormComponent>
);

export default connect(
  null,
  null,
)(SignatureForm);
