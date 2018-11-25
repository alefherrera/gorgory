import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import GuideEditorLayout from '../../components/Guide/GuideEditorLayout';
import { editGuideSelector } from '../../selectors/entities/guide';
import { subscribedCoursesSelector } from '../../selectors/entities/course';
import { getSubscribedCourses } from '../../actions/course';
import { updateGuide } from '../../actions/guide';
import { displayNotification } from '../../actions/notification';

class EditGuidePage extends Component {
  componentDidMount = () => {
    this.props.getSubscribedCourses();
  };

  handleSubmit = (values) => {
    debugger;
    this.props
      .updateGuide(
        {
          ...this.props.guide,
          ...values,
          courses: [{ id: values.course }],
        },
        {
          id: this.props.guide.id,
        },
      )
      .then(() => {
        this.props.displayNotification('Guia editada correctamente').then(() => {
          this.props.reset();
          this.props.history.push('/guide/list');
        });
      });
  };

  render() {
    const { guideId } = this.props.match.params;
    const { guide, courses } = this.props;
    return (
      <GuideEditorLayout
        title="Editar Guia"
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
  },
)(
  reduxForm({
    form: 'editGuide',

    destroyOnUnmount: true,
  })(EditGuidePage),
);
