import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import { RootFlexColumn, TitleText, StyledForm } from '../../components/Generic';
import { NewExercisesTable } from '../../components/Guide';

class AddGuidePage extends Component {
  state = {};

  render() {
    return (
      <RootFlexColumn>
        <TitleText text="Nueva Guia" />

        <Divider />
        <StyledForm>
          <Field name="name" label="Nombre" component={TextFieldWrapper} />
          <NewExercisesTable
            label="Ejercicios"
            // TODO: harcodeado
            exercisesRows={[{ number: 1, tests: 8 }, { number: 2, tests: 20 }]}
          >
            <Button
              component={Link}
              to="/guide/add/exercise"
              variant="fab"
              color="primary"
              aria-label="Add"
            >
              <AddIcon />
            </Button>
          </NewExercisesTable>
        </StyledForm>
      </RootFlexColumn>
    );
  }
}

export default connect(
  null,
  {},
)(reduxForm({ form: 'addGuide' })(AddGuidePage));
