import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { IconButton, Icon } from '@material-ui/core';
import AddTestDialog from './AddTestDialog';
import { editExerciseFromGuide } from '../../actions/guide';
import { routeFlowSelector } from '../../selectors/routeFlow';
import ExerciseEditorLayout from '../../components/Exercise/ExerciseEditorLayout';
import { setTestToEdit } from '../../actions/test';
import { toEditExerciseSelector } from '../../selectors/createGuide';

class EditExercisePage extends Component {
  state = {
    dialog: false,
    edit: false,
    tests: [],
  };

  componentWillMount = () => {
    this.setState({ ...this.state, tests: this.props.testCases || [] });
  };

  showTestDialog = () => {
    this.setState({ dialog: true });
  };

  handleSubmit = (values) => {
    const { exerciseId } = this.props.match.params;
    this.props.editExerciseFromGuide({
      id: exerciseId,
      exercise: { ...values, testCases: this.state.tests },
    });
    this.props.history.push(this.props.routeFlow.toGuidePage);
  };

  handleDialogClose = () => {
    this.setState({ ...this.state, dialog: false, edit: false });
    this.props.setTestToEdit({});
  };

  handleDialogSubmit = (testCase) => {
    const { edit, editId } = this.state;
    if (edit) {
      this.setState({
        ...this.state,
        tests: [...this.state.tests.filter((t, i) => i !== editId), testCase],
        dialog: false,
      });
    } else {
      this.setState({ ...this.state, tests: [...this.state.tests, testCase], dialog: false });
    }
  };

  handleDeleteTest = (id) => {
    this.setState({ ...this.state, tests: this.state.tests.filter((t, i) => i !== id) });
  };

  handleEditTest = (id) => {
    this.setState({ ...this.state, edit: true, editId: id });
    this.props.setTestToEdit(this.state.tests[id]);
    this.showTestDialog();
  };

  buttonProvider = id => (
    <div>
      <IconButton onClick={() => this.handleEditTest(id)}>
        <Icon style={{ color: '#00897b' }}>edit</Icon>
      </IconButton>
      <IconButton onClick={() => this.handleDeleteTest(id)}>
        <Icon style={{ color: '#ff511b' }}>delete</Icon>
      </IconButton>
    </div>
  );

  render() {
    return (
      <ExerciseEditorLayout
        title="Editar Ejercicio"
        handleSubmit={this.props.handleSubmit(this.handleSubmit)}
        onButtonClick={this.showTestDialog}
        testRows={this.state.tests}
        testButtonsProvider={this.buttonProvider}
      >
        <AddTestDialog
          title={this.state.edit ? 'Editar Test' : 'Agregar Test'}
          open={this.state.dialog}
          onClose={this.handleDialogClose}
          onSubmit={this.handleDialogSubmit}
        />
      </ExerciseEditorLayout>
    );
  }
}

EditExercisePage.propTypes = {
  handleSubmit: PropTypes.func,
  editExerciseFromGuide: PropTypes.func,
  history: PropTypes.object,
};

export default connect(
  state => ({
    routeFlow: routeFlowSelector(state),
    initialValues: { ...toEditExerciseSelector(state) },
    testCases: toEditExerciseSelector(state).testCases,
  }),
  { editExerciseFromGuide, setTestToEdit },
)(
  reduxForm({
    form: 'editExercise',
    enableReinitialize: true,
  })(EditExercisePage),
);
