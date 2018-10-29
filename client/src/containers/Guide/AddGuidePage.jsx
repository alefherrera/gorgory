import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextFieldWrapper from '../../components/TextFieldWrapper';
import { RootFlexColumn, TitleText, StyledForm } from '../../components/Generic';
import { NewExercisesTable } from '../../components/Guide';
import { addGuide, createGuide } from '../../actions/guide';
import { displayNotification } from '../../actions/notification';
import { createdGuideSelector } from '../../selectors/createGuide';

class AddGuidePage extends Component {
  componentDidMount = () => {
    this.props.createGuide();
  };

  handleSubmit = (values) => {
    this.props.addGuide({ ...values, ...this.props.created }).then(() => {
      this.props.displayNotification('Guia creada correctamente');
    });
  };

  render() {
    return (
      <RootFlexColumn>
        <TitleText text="Nueva Guia" />
        <Divider />
        <StyledForm onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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

AddGuidePage.propTypes = {
  handleSubmit: PropTypes.func,
  addGuide: PropTypes.func,
  createGuide: PropTypes.func,
  displayNotification: PropTypes.func,
  created: PropTypes.object,
};

export default connect(
  state => ({
    created: createdGuideSelector(state),
  }),
  { addGuide, createGuide, displayNotification },
)(reduxForm({ form: 'addGuide' })(AddGuidePage));
