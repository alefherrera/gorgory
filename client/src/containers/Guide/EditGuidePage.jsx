import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { IconButton, Icon } from '@material-ui/core';
import GuideEditorLayout from '../../components/Guide/GuideEditorLayout';
import { editGuideSelector } from '../../selectors/entities/guide';
import { subscribedCoursesSelector } from '../../selectors/entities/course';
import { getSubscribedCourses } from '../../actions/course';
import { updateGuide, deleteExerciseFromGuide, selectExerciseToEdit } from '../../actions/guide';
import { displayNotification } from '../../actions/notification';
import { setRouteFlow } from '../../actions/routeFlow';

class EditGuidePage extends Component {
  componentWillMount = () => {
    const { guideId } = this.props.match.params;
    this.props.getSubscribedCourses();
    this.props.setRouteFlow({
      toGuidePage: `/guide/edit/${guideId}`,
    });
  };

  handleSubmit = (values) => {
    const { guideId } = this.props.match.params;
    this.props
      .updateGuide(
        {
          ...this.props.guide,
          ...values,
          courses: [{ id: values.course }],
        },
        {
          id: guideId,
        },
      )
      .then(() => {
        this.props.displayNotification('Guia editada correctamente').then(() => {
          this.props.reset();
          this.props.history.push('/guide/list');
        });
      });
  };

  handleDeleteExercise = (id) => {
    this.props.deleteExerciseFromGuide({ id });
  };

  handleEditExercise = (id) => {
    const { guideId } = this.props.match.params;
    this.props.history.push(`/guide/edit/${guideId}/${id}`);
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
    const { guide, courses } = this.props;
    return (
      <GuideEditorLayout
        title="Editar Guia"
        exercisesButtonsProvider={this.exercisesButtonsProvider}
        handleSubmit={this.props.handleSubmit(this.handleSubmit)}
        courses={courses}
        guide={guide}
      />
    );
  }
}

const getInitalValues = guide => guide && {
  start: guide.start,
  end: guide.end,
  name: guide.name,
  language: guide.language,
  course: guide.courses[0] && guide.courses[0].id,
};

export default connect(
  state => ({
    guide: editGuideSelector(state),
    courses: subscribedCoursesSelector(state),
    initialValues: getInitalValues(editGuideSelector(state)),
  }),
  {
    getSubscribedCourses,
    updateGuide,
    displayNotification,
    setRouteFlow,
    deleteExerciseFromGuide,
    selectExerciseToEdit,
  },
)(
  reduxForm({
    form: 'editGuide',

    destroyOnUnmount: true,
  })(EditGuidePage),
);
