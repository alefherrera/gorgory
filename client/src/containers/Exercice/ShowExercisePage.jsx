import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { uploadResolution } from '../../actions/resolution';
import DropZoneWrapper from '../../components/DropZoneWrapper';
import FormComponent from '../../components/FormComponent';
import { StyledButton, TitleText } from '../../components/Generic';
import MultilineText from '../../components/MultilineText';
import TestCaseTable from '../../components/TestCaseTable';
import OutputLogger from '../OutputLogger';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 12px;
`;

const Row = styled.div`
  width: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
  height: ${props => props.height || '100%'};
  justify-content: ${props => props.align || 'left'};
`;

class ShowExercicePage extends Component {
  componentDidMount = () => {
    const { exerciceId } = this.props.match.params;
    this.props.getExercise(exerciceId);
  };

  handleSubmit = (values) => {
    const [file] = values.file;
    const { exerciceId } = this.props.match.params;
    // eslint-disable-next-line
    values.file = file;
    this.props.uploadResolution(values, { id: exerciceId });
  };

  render() {
    const { exercise } = this.props;
    return (
      <div>
        <TitleText text="Ejercicio" />
        <Divider />
        <Container>
          <Row>
            <Typography gutterBottom variant="title" align="left" component="h2">
              Enunciado
            </Typography>
          </Row>
          <Row height="150px">
            <MultilineText>{exercise.description}</MultilineText>
          </Row>
          <Row>
            <Typography gutterBottom variant="title" align="left" component="h2">
              Tests
            </Typography>
          </Row>
          <Row height="150px">
            <TestCaseTable testCases={exercise.testCases} />
          </Row>
          <Row>
            <FormComponent
              buttonText="Ejecutar"
              onSubmit={this.props.handleSubmit(this.handleSubmit)}
            >
              <Field name="file" label="Subir Aqui" component={DropZoneWrapper} />
            </FormComponent>
            <OutputLogger />
          </Row>
          <Row>
            <Divider />
          </Row>
          <Row align="right">
            <StyledButton variant="raised" color="secondary">
              Cancelar
            </StyledButton>
            <StyledButton type="submit" variant="raised" color="primary">
              Aceptar
            </StyledButton>
          </Row>
        </Container>
      </div>
    );
  }
}

ShowExercicePage.propTypes = {
  getExercise: PropTypes.func,
  handleSubmit: PropTypes.func,
  uploadResolution: PropTypes.func,
  match: PropTypes.object,
  exercise: PropTypes.object,
};

const MockExercise = {
  description: 'Test test test test',
  testCases: [
    {
      name: 'Caso de prueba 1',
      arguments: [],
      expected: 1,
    },
    {
      name: 'Caso de prueba 2',
      arguments: [],
      expected: 1,
    },
    {
      name: 'Caso de prueba 3',
      arguments: [],
      expected: 1,
    },
    {
      name: 'Caso de prueba 4',
      arguments: [],
      expected: 1,
    },
    {
      name: 'Caso de prueba 5',
      arguments: [],
      expected: 1,
    },
  ],
};

export default connect(
  state => ({
    exercise: MockExercise,
  }),
  { getExercise, uploadResolution },
)(reduxForm({ form: 'resolution' })(ShowExercicePage));
