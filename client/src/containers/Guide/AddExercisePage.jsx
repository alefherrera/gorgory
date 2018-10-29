import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm } from 'redux-form';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import AreaTextWrapper from '../../components/AreaTextWrapper';
import { RootFlexColumn, TitleText, StyledForm } from '../../components/Generic';
import { NewTestTable } from '../../components/Guide';
import AddTestDialog from './AddTestDialog';
import { addExerciseToGuide } from '../../actions/guide';

class AddExercisePage extends Component {
  state = {
    dialog: false,
    tests: [],
  };

  showTestDialog = () => {
    this.setState({ dialog: true });
  };

  handleSubmit = (values) => {
    this.props.addExerciseToGuide({ ...values, testCases: this.state.tests });
    this.props.history.push('/guide/add');
  };

  handleDialogClose = () => {
    this.setState({ dialog: false });
  };

  handleDialogSubmit = (testCase) => {
    this.setState({ tests: [...this.state.tests, testCase] });
  };

  render() {
    return (
      <RootFlexColumn>
        <AddTestDialog
          open={this.state.dialog}
          onClose={this.handleDialogClose}
          onSubmit={this.handleDialogSubmit}
        />
        <TitleText text="Nuevo Ejercicio" />
        <Divider />
        <StyledForm onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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

AddExercisePage.propTypes = {
  handleSubmit: PropTypes.func,
  addExerciseToGuide: PropTypes.func,
  history: PropTypes.object,
};

export default connect(
  null,
  { addExerciseToGuide },
)(reduxForm({ form: 'addExercise' })(AddExercisePage));
