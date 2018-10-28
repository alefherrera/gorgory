import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm } from 'redux-form';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import AreaTextWrapper from '../../components/AreaTextWrapper';
import { RootFlexColumn, TitleText, StyledForm } from '../../components/Generic';
import { NewTestTable } from '../../components/Guide';
import AddTestDialog from './AddTestDialog';
import { newExercise } from '../../actions/exercise';
import { lastExerciseSelector } from '../../selectors/guide';

class AddExercisePage extends Component {
  state = {
    dialog: false,
  };

  componentDidMount = () => {
    // Creo la guia cuando se esta por crear el componente
    this.props.newExercise();
  };

  showTestDialog = () => {
    this.setState(state => ({ ...state, dialog: true }));
  };

  render() {
    return (
      <RootFlexColumn>
        <AddTestDialog open={this.state.dialog} />
        <TitleText text="Nuevo Ejercicio" />
        <Divider />
        <StyledForm>
          <Field name="name" label="Nombre" component={TextFieldWrapper} />
          <Field rows="8" name="description" label="Enunciado" component={AreaTextWrapper} />
          <NewTestTable
            label="Tests"
            onClick={this.showTestDialog}
            testRows={[{ number: 1, name: 'Tests Megadificil' }, { number: 2, name: 'P=NP?' }]}
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
)(reduxForm({ form: 'addExercise' })(AddExercisePage));
