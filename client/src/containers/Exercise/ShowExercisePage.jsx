import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { getExercise } from '../../actions/exercise';
import { getResolutionHistory, uploadResolution } from '../../actions/resolution';
import DropZoneWrapper from '../../components/DropZoneWrapper';
import FormComponent from '../../components/FormComponent';
import { TitleText } from '../../components/Generic';
import MultilineText from '../../components/MultilineText';
import TestCaseTable from '../../components/TestCaseTable';
import { exerciseSelector } from '../../selectors/entities/exercise';
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

class ShowExercisePage extends Component {
  componentDidMount = () => {
    const { exerciseId } = this.props.match.params;
    this.props.getExercise(undefined, { id: exerciseId });
    this.props.getResolutionHistory(undefined, { exerciseId });
  };

  handleSubmit = (values) => {
    const [file] = values.file;
    const { exerciseId } = this.props.match.params;
    // eslint-disable-next-line
    values.file = file;
    this.props.uploadResolution(values, { id: exerciseId });
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
        </Container>
      </div>
    );
  }
}

ShowExercisePage.propTypes = {
  getExercise: PropTypes.func,
  getResolutionHistory: PropTypes.func,
  handleSubmit: PropTypes.func,
  uploadResolution: PropTypes.func,
  match: PropTypes.object,
  exercise: PropTypes.object,
};

export default connect(
  state => ({
    exercise: exerciseSelector(state),
  }),
  { getExercise, getResolutionHistory, uploadResolution },
)(reduxForm({ form: 'resolution' })(ShowExercisePage));
