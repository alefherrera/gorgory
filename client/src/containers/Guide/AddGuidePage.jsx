import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { IconButton, Icon } from '@material-ui/core';
import {
  addGuide,
  createGuide,
  deleteExerciseFromGuide,
  selectExerciseToEdit,
} from '../../actions/guide';
import { displayNotification } from '../../actions/notification';
import { getSubscribedCourses } from '../../actions/course';
import { createdGuideSelector } from '../../selectors/createGuide';
import { subscribedCoursesSelector } from '../../selectors/entities/course';
import { setRouteFlow } from '../../actions/routeFlow';
import GuideEditorLayout from '../../components/Guide/GuideEditorLayout';

class AddGuidePage extends Component {
  componentDidMount = () => {
    this.props.createGuide();
    this.props.getSubscribedCourses();
    this.props.setRouteFlow({
      toGuidePage: '/guide/add',
    });
  };

  handleSubmit = (values) => {
    this.props
      .addGuide({
        ...values,
        ...this.props.created,
        courses: [{ id: values.course }],
      })
      .then(() => {
        this.props.displayNotification('Guia creada correctamente').then(() => {
          this.props.reset();
          this.props.history.push('/guide/list');
        });
      });
  };

  handleDeleteExercise = (id) => {
    this.props.deleteExerciseFromGuide({ id });
  };

  handleEditExercise = (id) => {
    this.props.history.push(`/guide/add/exercise/${id}`);
    this.props.selectExerciseToEdit({ id });
  };

  exercisesButtonsProvider = id => (
    <div>
      <IconButton onClick={() => this.handleEditExercise(id)}>
        <Icon style={{ color: '#00897b' }}>edit</Icon>
      </IconButton>
      <IconButton onClick={() => this.handleDeleteExercise(id)}>
        <Icon style={{ color: '#ff511b' }}>delete</Icon>
      </IconButton>
    </div>
  );

  render() {
    return (
      <GuideEditorLayout
        title="Nueva Guia"
        exercisesButtonsProvider={this.exercisesButtonsProvider}
        handleSubmit={this.props.handleSubmit(this.handleSubmit)}
        courses={this.props.courses}
        guide={this.props.created}
      />
    );
  }
}

AddGuidePage.propTypes = {
  handleSubmit: PropTypes.func,
  addGuide: PropTypes.func,
  createGuide: PropTypes.func,
  displayNotification: PropTypes.func,
  created: PropTypes.object,
  history: PropTypes.object,
  reset: PropTypes.func,
  getSubscribedCourses: PropTypes.func,
  setRouteFlow: PropTypes.func,
  courses: PropTypes.array,
};

export default connect(
  state => ({
    created: createdGuideSelector(state),
    courses: subscribedCoursesSelector(state),
  }),
  {
    addGuide,
    createGuide,
    displayNotification,
    getSubscribedCourses,
    setRouteFlow,
    deleteExerciseFromGuide,
    selectExerciseToEdit,
  },
)(
  reduxForm({
    form: 'addGuide',

    destroyOnUnmount: false,
  })(AddGuidePage),
);
