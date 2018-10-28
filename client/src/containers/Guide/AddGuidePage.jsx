import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import { RootFlexColumn, TitleText, StyledForm } from '../../components/Generic';
import { NewExercisesTable } from '../../components/Guide';

import { newExercise } from '../../actions/exercise';
import { lastExerciseSelector } from '../../selectors/guide';

class AddGuidePage extends Component {
  state = {};

  handleNewExercise = () => {
    console.log('asdasdas');
    this.props.newExercise();
  };

  render() {
    return (
      <RootFlexColumn>
        <TitleText text="Nueva Guia" />
        <Button component={Link} to="/">
          home
        </Button>
        <Divider />
        <StyledForm>
          <Field name="name" label="Nombre" component={TextFieldWrapper} />
          <NewExercisesTable
            onClick={this.handleNewExercise}
            label="Ejercicios"
            buttonComponent={Link}
            buttonTo={`/guide/add/exercise/${this.props.lastExercise}`}
            // TODO: harcodeado
            exercisesRows={[{ number: 1, tests: 8 }, { number: 2, tests: 20 }]}
          />
        </StyledForm>
      </RootFlexColumn>
    );
  }
}

export default connect(
  state => ({
    lastExercise: lastExerciseSelector(state),
  }),
  { newExercise },
)(reduxForm({ form: 'addGuide' })(AddGuidePage));
